package com.testexample.materialdesigntest.ui.tpoDashboard

import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ResultListPresenter(private var view: TPODashboardContract.ResultListView?) : TPODashboardContract.ResultListPresenter {

    val TAG = "ResultListPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IResultRepo
    private var subscriptions = CompositeDisposable()

    override fun fetchResultList(code: Int, question_paper_id: String) {
        HyperLog.d(TAG, "<< fetchResultList()")
        repository = ResultRepo()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            view!!.showLoading(true)
            sessionManager.getUserAuthToken()?.let { it1 ->
                subscriptions.add(
                        repository.getStudentResultListFromRemoteRepo(it1, code, question_paper_id)
                                .subscribeOn(Schedulers.io())
                                .observeOn(AndroidSchedulers.mainThread())
                                .handelNetworkError()
                                .subscribe(
                                        { success ->
                                            view!!.showLoading(false)
                                            if (success.isNotEmpty())
                                                view!!.showResultList(success)

                                            HyperLog.i(TAG, "Successfully Get Student Result List.")
                                        },
                                        { error ->
                                            view!!.showLoading(false)
                                            HyperLog.e(TAG,
                                                "Failed to get Student Result List with reason:" +
                                                        " ${error.message.toString()}")

                                            if (error.message.toString().contains("704")) {
                                                Toast.makeText(view!!.setContext(),
                                                    "Result is not released yet!!", Toast.LENGTH_LONG).show()
                                            }
                                        })
                )
            }

        }
        HyperLog.d(TAG, ">> fetchResultList()")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

}