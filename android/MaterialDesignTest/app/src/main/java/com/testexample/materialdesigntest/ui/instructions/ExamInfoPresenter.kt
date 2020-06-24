package com.testexample.materialdesigntest.ui.instructions

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



class ExamInfoPresenter(private var view: InstructionsContract.ExamInfoView?):
    InstructionsContract.ExamInfoPresenter {

    val TAG = "ExamInfo Presenter"

    private lateinit var repository: IPreExamInstructionsRepo
    private lateinit var studentRepo: IUserRepository
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager
    override lateinit var student: Student


    override fun fetchExamInfo(request: FetchExamRequest) {
        repository = PreExamInstructionsRepo()

        sessionManager = SessionManager(view!!.setContext())
        Log.d(TAG,"fetch ExamInfo at token ${sessionManager.getUserAuthToken()}")

        view?.let {
                repository
                    .getExamInfoFromRemoteRepo(sessionManager.getUserAuthToken()!!,
                        request)
                    .subscribeOn(Schedulers.io())
                    .handelNetworkError()
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                        {questionPaper ->
                            view!!.showExamInfo(questionPaper)
                        },
                        {
                            view!!.showExamInfo(null)
                        }
                    )
        }
    }

    override fun fetchCollegeCode(year: Int, month: Int, dayOfMonth: Int){
        studentRepo = UserRepository(view!!.setContext())
        sessionManager = SessionManager(view!!.setContext())
        val userId = sessionManager.getUserId()!!
        val token = sessionManager.getUserAuthToken()!!
        subscriptions.add(
            studentRepo.getStudent(UserRequest(token,userId))
                .handelNetworkError()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                    {success->
                        fetchExamInfo(FetchExamRequest(success.studentCollegeCode,
                            year, month, dayOfMonth))
                        this.student = success
                        Log.d(TAG, "Fetch college code for student found $success")
                    },
                    {
                        error->
                        println(error.localizedMessage)
                    },
                    {
                        println("on Complete")
                    }
                )
        )
    }

    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }
}