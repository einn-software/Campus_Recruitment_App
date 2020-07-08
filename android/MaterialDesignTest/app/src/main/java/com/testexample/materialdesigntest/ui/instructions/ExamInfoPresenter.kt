package com.testexample.materialdesigntest.ui.instructions

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
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
    private lateinit var studentRepo: IUserRepository
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager
    override lateinit var student: Student

    override fun fetchExamInfo(request: FetchExamRequest) {
        Log.d(TAG, "<< fetchExamInfo")
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
 				                view!!.showLoading(false)
                                view!!.showExamInfo(questionPaper)
                                Log.i(TAG, "Successfully fetch exam info")
                            },
                            {
			    	            view!!.showLoading(false)
                                view!!.showExamInfo(null)
                                Log.e(TAG, "Error in fetching exam info: ${it.message.toString()}")
                            }
                    )
        }
        Log.d(TAG, ">> fetchExamInfo")
    }

    override fun fetchCollegeCode(year: Int, month: Int, dayOfMonth: Int) {
        Log.d(TAG, "<< fetchCollegeCode")
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
                                    Log.i(TAG, "Successfully fetch college code for student")
                                },
                                { error ->
                                    Log.e("TAG", "Error in fetching Student: ${error.message.toString()}")
				                    view!!.showLoading(false)

                                },
                                {
                                    Log.d(TAG, "getStudent Query completed")
                                }
                        )
        )
        Log.d(TAG, ">> fetchCollegeCode")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}