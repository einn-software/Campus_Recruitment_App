package com.testexample.materialdesigntest.ui.result

import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers


class ResultsPresenter(private var view: ResultsContract.View?) :
        ResultsContract.Presenter {

    val TAG = "ResultsPresenter"

    private lateinit var repository: IResultRepo
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager


    override fun fetchStudentResult(code: Int, roll: String, question_paper_id: String) {

        HyperLog.d(TAG, "<< fetchStudentResult")
        repository = ResultRepo()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            subscriptions.add(
                    repository.getStudentResultFromRemoteRepo(sessionManager.getUserAuthToken()!!,
                        code, roll, question_paper_id)
                            .subscribeOn(Schedulers.io())
                            .handelNetworkError()
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(
                                    { success ->
                                        HyperLog.i(TAG, "Successfully fetched result from remote : $success")
                                        view!!.showResults(success)
                                    },
                                    { error ->
                                        HyperLog.e(TAG, "Error in fetching Result from Remote: ${error.message.toString()}")
                                    }

                            ))
        }
        HyperLog.d(TAG, ">> fetchStudentResult")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}