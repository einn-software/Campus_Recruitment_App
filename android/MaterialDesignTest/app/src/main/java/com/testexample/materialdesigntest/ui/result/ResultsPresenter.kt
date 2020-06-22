package com.testexample.materialdesigntest.ui.result

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers


class ResultsPresenter(private var view: ResultsContract.View?) :
        ResultsContract.Presenter {

    val TAG = "Result Presenter"

    private lateinit var repository: IResultRepo
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager


    override fun fetchStudentResult(code: Int, roll: String, question_paper_id: String) {

        repository = ResultRepo()
        sessionManager = SessionManager(view!!.setContext())
        Log.d(TAG, "fetch Result for id:  ${sessionManager.getUserId()}")

        view.let {
            subscriptions.add(
                    repository.getStudentResultFromRemoteRepo(sessionManager.getUserAuthToken()!!, code, roll, question_paper_id)
                            .subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .subscribe(
                                    { success ->
                                        view!!.showResults(success)

                                        Log.i(TAG, "Successfully Fetched Result From Remote")
                                    },
                                    { error ->
                                        Log.e(TAG, "Error in fetching Result from Remote ${error.message.toString()}")
                                    }

                            ))
        }
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}