package com.testexample.materialdesigntest.ui.instructions

import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers


class ExamInfoPresenter(private var view: InstructionsContract.ExamInfoView?) :
        InstructionsContract.ExamInfoPresenter {

    val TAG = "ExamInfoPresenter"

    private lateinit var repository: IPreExamInstructionsRepo
    private lateinit var resultRepo: ResultRepo
    private lateinit var studentRepo: IUserRepository
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager
    override lateinit var student: Student

    override fun fetchExamInfo(request: FetchExamRequest) {
        HyperLog.d(TAG, "<< fetchExamInfo")
        repository = PreExamInstructionsRepo()
        sessionManager = SessionManager(view!!.setContext())

        view?.let {
            repository
                    .getExamInfoFromRemoteRepo(sessionManager.getUserAuthToken()!!, request)
                    .subscribeOn(Schedulers.io())
                    .handelNetworkError()
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                            { questionPaper ->
                                fetchExamResult(questionPaper.collegeCode, student.studentRollNo, questionPaper.questionPaperId)
                                view!!.showExamInfo(questionPaper)
                                HyperLog.i(TAG, "Successfully fetch exam info")
                            },
                            {
			    	            view!!.showLoading(false)
                                view!!.showExamInfo(null)
                                HyperLog.e(TAG, "Error in fetching exam info: ${it.message.toString()}")
                            }
                    )
        }
        HyperLog.d(TAG, ">> fetchExamInfo")
    }

    override fun fetchCollegeCode(year: Int, month: Int, dayOfMonth: Int) {
        HyperLog.d(TAG, "<< fetchCollegeCode")
        studentRepo = UserRepository()
        sessionManager = SessionManager(view!!.setContext())
        val userId = sessionManager.getUserId()!!
        val token = sessionManager.getUserAuthToken()!!
        view!!.showLoading(true)
        subscriptions.add(
                studentRepo.getStudent(UserRequest(token, userId))
                        .handelNetworkError()
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { success ->
                                    fetchExamInfo(FetchExamRequest(success.studentCollegeCode, year, month, dayOfMonth))
                                    student = success
                                    HyperLog.i(TAG, "Successfully fetch college code for student")
                                },
                                { error ->
                                    HyperLog.e("TAG", "Error in fetching Student: ${error.message.toString()}")
				                    view!!.showLoading(false)
                                    Toast.makeText(view!!.setContext(), error.message, Toast.LENGTH_LONG).show()
                                },
                                {
                                    HyperLog.d(TAG, "getStudent Query completed")
                                }
                        )
        )
        HyperLog.d(TAG, ">> fetchCollegeCode")
    }

    override fun fetchExamResult(code: Int, roll: String, question_paper_id: String) {

        HyperLog.d(TAG, "<< fetchExamResult")
        resultRepo = ResultRepo()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            subscriptions.add(
                resultRepo.getStudentResultFromRemoteRepo(sessionManager.getUserAuthToken()!!,
                    code, roll, question_paper_id)
                    .subscribeOn(Schedulers.io())
                    .handelNetworkError()
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                        { success ->
                            HyperLog.i(TAG, "Successfully Fetched Result From Remote : $success")
                            view!!.showLoading(false)
                            view!!.resultAvailable = true
                            Toast.makeText(view!!.setContext(), "You have already taken this Exam!",
                                Toast.LENGTH_LONG).show()
                        },
                        { error ->
                            HyperLog.e(TAG, "Error in fetching Result from Remote: ${error.localizedMessage}")
                            view!!.showLoading(false)
                            view!!.resultAvailable = false
                        }
                    ))
        }
        HyperLog.d(TAG, ">> fetchExamResult")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}