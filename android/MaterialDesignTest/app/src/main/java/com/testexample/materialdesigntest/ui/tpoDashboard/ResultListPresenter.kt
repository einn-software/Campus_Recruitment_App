package com.testexample.materialdesigntest.ui.TPODashboard

import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.data.interactor.implementation.ResultRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class ResultListPresenter(private var view: TPODashboardContract.ResultListView?): TPODashboardContract.ResultListPresenter{

    val TAG = "ResultListPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IResultRepo

    override fun fetchResultList(code: Int, question_paper_id: String) {
        Log.d(TAG,"<< fetchResultList()")
        repository = ResultRepo()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repository.getStudentResultListFromRemoteRepo(it1, code, question_paper_id)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .handelNetworkError()
                        .subscribe(
                                { success ->
                                    view!!.showResultList(success)
                                    Log.i(TAG, "Successfully Get Student Result List.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get Student Result List with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
                                })
            }

        }
        Log.d(TAG,">> fetchResultList()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}