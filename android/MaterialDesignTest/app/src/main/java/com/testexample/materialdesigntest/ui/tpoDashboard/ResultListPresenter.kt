package com.testexample.materialdesigntest.ui.tpoDashboard

import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ResultListPresenter(private var view: TPODashboardContract.ResultListView?): TPODashboardContract.ResultListPresenter{

    val TAG = "ResultListPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IResultRepo
    private  var subscriptions = CompositeDisposable()

    override fun fetchResultList(code: Int, question_paper_id: String) {
        Log.d(TAG,"<< fetchResultList()")
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
                                    view!!.showResultList(success)
                                    Log.i(TAG, "Successfully Get Student Result List.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get Student Result List with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
                                    view!!.showLoading(false)
                                })
                )
            }

        }
        Log.d(TAG,">> fetchResultList()")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }

}