package com.innobitsystems.campusrecruiter.ui.resetAuthentication

import android.annotation.SuppressLint
import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.implementation.UserRepository
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IUserRepository
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class ResetAuthenticationPresenter(private  var view : ResetAuthenticationContract.View?) : ResetAuthenticationContract.Presenter  {

    private val TAG = "ResetAuthenticationPresenter"
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    @SuppressLint("LongLogTag")
    override fun onResetPasswordRequest(email: String, userType: String) {

        HyperLog.d(TAG, "<< onResetPasswordRequest")
        userRepository = UserRepository()

        when {
            email.isEmpty() -> Toast.makeText(
                view!!.setContext(),
                "Email can not be Empty! ",
                Toast.LENGTH_SHORT
            ).show()
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() -> {
                Toast.makeText(
                    view!!.setContext(),
                    "Please Provide a valid Email ",
                    Toast.LENGTH_SHORT
                ).show()
            }
            else -> {
                view!!.showProgress(true)
                HyperLog.d(TAG, "forgotPassword at $email")
                view?.let {
                    subscriptions.add(userRepository
                        .forgotPassword(email, userType)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .handelNetworkError().subscribe(
                            { success ->
                                HyperLog.i(TAG, "Successfully requested for reset password link $success")
                                view!!.showProgress(false)
                                view!!.onResetRequestComplete(success.message)
                            },
                            {
                                HyperLog.e(
                                    TAG,
                                    "Error in sending reset password link: ${it.message.toString()}"
                                )
                                view!!.showProgress(false)
                                view!!.onResetRequestComplete("fail")
                            }
                        )
                    )
                }
                HyperLog.d(TAG, ">> onResetPasswordRequest")
            }
        }
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}