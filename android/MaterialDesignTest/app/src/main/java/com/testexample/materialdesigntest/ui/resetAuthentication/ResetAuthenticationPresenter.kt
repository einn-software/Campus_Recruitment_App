package com.testexample.materialdesigntest.ui.resetAuthentication

import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.internal.operators.maybe.MaybeIsEmptySingle
import io.reactivex.schedulers.Schedulers
import org.jetbrains.anko.Android

class ResetAuthenticationPresenter(private  var view : ResetAuthenticationContract.View?) :
    ResetAuthenticationContract.Presenter  {

    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onResetPasswordRequest(email: String, userType: String) {
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
                            view!!.onResetRequestComplete(success)
                        },
                        {
                            view!!.onResetRequestComplete(false.toString())
                        }
                    )
            )
        }
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}