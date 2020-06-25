package com.testexample.materialdesigntest.ui.examination

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.ExaminationRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ExaminationPresenter(private var view: ExaminationContract.View?) : ExaminationContract.Presenter {

    private var sessionManager: SessionManager = SessionManager(view!!.setContext())
    val TAG = "Examination Presenter"
    private lateinit var repository: IExaminationRepo
    private var subscriptions = CompositeDisposable()
    private val token = sessionManager.getUserAuthToken()!!

    override fun loadExam(fetchExamRequest: FetchExamRequest) {
        Log.d(TAG, "<< loadExam")
        repository = ExaminationRepo()
        view.let {
            subscriptions.add(
                    repository.loadQuestionPaperFromRemote(token, fetchExamRequest)
                            .subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(
                                    { questionPaper ->
                                        if (questionPaper != null) {
                                            view!!.setExamPaper(questionPaper)
                                            Log.i(TAG, "Successfully get question paper from remote")
                                        }
                                    },
                                    { error ->
                                        Log.e(TAG, "Error fetching question paper from remote with reason ${error.message.toString()}")
                                    })
            )
        }
        Log.d(TAG, ">> loadExam")
    }

    override fun endExam(endExamRequest: EndExamRequest) {
        Log.d(TAG, "<< endExam")
        repository = ExaminationRepo()
        subscriptions.clear()
        view!!.showLoading(true)

        subscriptions.add(
                repository.stopExam(token, endExamRequest)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                {
                                    view!!.showLoading(false)
                                    view!!.openNextActivity()
                                    Log.i(TAG, "Successfully stopped exam")
                                },
                                { error ->
                                    Log.e(TAG, "Error stop exam with reason ${error.message.toString()}")
                                }
                        )
        )
        Log.d(TAG, ">> endExam")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

}