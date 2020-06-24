package com.testexample.materialdesigntest.ui.tpoDashboard

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class TPODashboardPresenter(private var view: TPODashboardContract.View?) : TPODashboardContract.Presenter {

    val TAG = "TPODashboardPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: ICollegeDetails
    private var subscriptions = CompositeDisposable()

    override fun fetchTpoDetails(token: String, id: String) {
        Log.d(TAG,"<< fetchTpoDetails()")
        val repo = UserRemoteRepository()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repo.getTPO(UserRequest(it1, id))
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .subscribe(
                                { success ->
                                    view!!.showTpoDetails(success
                                    )
                                    Log.i(TAG, "Successfully Get TPO details.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get TPO Details with reason: ${error.message.toString()}")
                                })
            }

        }
        Log.d(TAG,">> fetchTpoDetails()")
    }



    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}