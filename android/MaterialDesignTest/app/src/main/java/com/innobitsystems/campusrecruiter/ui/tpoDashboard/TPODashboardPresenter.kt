package com.innobitsystems.campusrecruiter.ui.tpoDashboard

import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.implementation.UserRepository
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IUserRepository
import com.innobitsystems.campusrecruiter.data.network.model.UserRequest
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class TPODashboardPresenter(private var view: TPODashboardContract.View?) : TPODashboardContract.Presenter {

    val TAG = "TPODashboardPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IUserRepository

    override fun fetchTpoDetails(token: String, id: String) {
        HyperLog.d(TAG,"<< fetchTpoDetails()")
        repository = UserRepository()
        sessionManager = SessionManager(view!!.setContext())
        view.let {
            sessionManager.getUserAuthToken()?.let { it1 ->
                repository.getTpo(UserRequest(it1, id))
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .handelNetworkError()
                        .subscribe(
                                { success ->
                                    view!!.showTpoDetails(success)
                                    HyperLog.i(TAG, "Successfully Get TPO details.")
                                },
                                { error ->
                                    HyperLog.e(TAG, "Failed to get TPO Details with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
                                })
            }

        }
        HyperLog.d(TAG,">> fetchTpoDetails()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}