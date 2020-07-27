package com.innobitsystems.campusrecruiter.ui.login

import android.widget.Toast
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.implementation.UserRepository
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IUserRepository
import com.innobitsystems.campusrecruiter.data.network.model.AuthResponse
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import com.innobitsystems.campusrecruiter.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class TpoLoginPresenter(private var view: LoginContract.TpoView?) : LoginContract.TpoPresenter {

    private val TAG = "TpoLoginPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onTpoLogin(email: String, password: String) {
        HyperLog.d(TAG, "<< onTpoLogin")
        userRepository = UserRepository()

        when {
            email.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_ROLL_NO_ERROR)
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() ->
                view!!.onValidationMessage(Constants.INVALID_ROLL_NO_ERROR)
            password.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_PASSWORD_ERROR)
            else ->
                userRepository.let {
                view!!.showLoading(true)
                subscriptions.add(userRepository
                        .isTpoValid(email, password)
                        .subscribeOn(Schedulers.io())
                        .observeOn(AndroidSchedulers.mainThread())
                        .handelNetworkError()
                        .subscribe(
                                { response ->
                                    HyperLog.i(TAG, "Successfully validate user")
                                    updateSession(response)
                                    view!!.showLoading(false)
                                    view!!.openMainActivity()
                                },
                                { error ->
                                    HyperLog.e(TAG, "Error in validating TPO: ${error.message.toString()}")
                                    view!!.showLoading(false)
					                Toast.makeText(view!!.setContext(),
                                            error.localizedMessage, Toast.LENGTH_LONG).show()
                                }
                        ))
            }
        }
        HyperLog.d(TAG, ">> onTpoLogin")
    }

    private fun updateSession(response: AuthResponse) {
        HyperLog.d(TAG, "<< updateSession")
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.saveUserSession(response)
        HyperLog.d(TAG, ">> updateSession")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}