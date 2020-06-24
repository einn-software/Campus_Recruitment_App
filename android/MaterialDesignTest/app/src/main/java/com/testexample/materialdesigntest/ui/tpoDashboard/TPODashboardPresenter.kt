package com.testexample.materialdesigntest.ui.TPODashboard

import android.util.Log
<<<<<<< HEAD:android/MaterialDesignTest/app/src/main/java/com/testexample/materialdesigntest/ui/tpoDashboard/TPODashboardPresenter.kt
=======
import android.widget.Toast
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
>>>>>>> f3d79ebc1893867388b4555e10c123e2c0a2789a:android/MaterialDesignTest/app/src/main/java/com/testexample/materialdesigntest/ui/TPODashboard/TPODashboardPresenter.kt
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class TPODashboardPresenter(private var view: TPODashboardContract.View?) : TPODashboardContract.Presenter {

    val TAG = "TPODashboardPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var repository: IUserRepository

    override fun fetchTpoDetails(token: String, id: String) {
        Log.d(TAG,"<< fetchTpoDetails()")
        repository = UserRepository(view!!.setContext())
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
                                    Log.i(TAG, "Successfully Get TPO details.")
                                },
                                { error ->
                                    Log.e(TAG, "Failed to get TPO Details with reason: ${error.message.toString()}")
                                    Toast.makeText(view!!.setContext(), error.message.toString(), Toast.LENGTH_LONG).show()
                                })
            }

        }
        Log.d(TAG,">> fetchTpoDetails()")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }
}