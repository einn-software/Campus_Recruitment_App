package com.testexample.materialdesigntest.ui.resetAuthentication

import android.annotation.SuppressLint
import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ResetAuthenticationPresenter(private  var view : ResetAuthenticationContract.View?) : ResetAuthenticationContract.Presenter  {

    private val TAG = "ResetAuthenticationPresenter"
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    @SuppressLint("LongLogTag")
    override fun onResetPasswordRequest(email: String, userType: String) {

        Log.d(TAG,"<< onResetPasswordRequest")
        userRepository = UserRepository(view!!.setContext())
        var request : Single<String> = Single.just("")

        view?.let {
            when (userType) {
                "student" -> {
                    request = userRepository.forgotPasswordStudent(email)
                }
                "tpo" -> {
                    request = userRepository.forgotPasswordTPO(email)
                }
            }
            subscriptions.add(
                request.subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .handelNetworkError()
                    .subscribe(
                        {success->
                            Log.i(TAG, "Successfully requested for reset password link")
                            view!!.onResetRequestComplete(success)
                        },
                        {
                            Log.e(TAG,"Error in sending reset password link: ${it.message.toString()}")
                            view!!.onResetRequestComplete(false.toString())
                        }
                    )
            )
        }
        Log.d(TAG,">> onResetPasswordRequest")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}