package com.testexample.materialdesigntest.ui.login

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



/**\
 * handles the actions from the view and updates the UI as required
 */
// Presenter Constructor takes view Instance
class TpoLoginPresenter(private var view: LoginContract.TpoView?) :
    LoginContract.TpoPresenter {

    private lateinit var sessionManager: SessionManager
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onTpoLogin(email: String, password: String) {
        userRepository =
            UserRepository(view!!.setContext())

        when {
            email.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_ROLL_NO_ERROR)
            !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches() ->
                view!!.onValidationMessage(Constants.INVALID_ROLL_NO_ERROR)
            password.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_PASSWORD_ERROR)
            else -> userRepository.let {
                view!!.showLoading(true)
                subscriptions.add(userRepository
                        .isTPOValid(email, password)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                        { response ->
                            updateSession(
                                response,
                                Constants.Companion
                                    .LoggedInMode.LOGGED_IN_MODE_SERVER
                            )
                            view!!.showLoading(false)
                            view!!.openMainActivity()
                        },
                        { error -> Log.e("Tpo Login Presenter", error.message.toString())
                        }
                    ))
            }
        }

    }

    private fun updateSession(response: AuthResponse, loginStatus: Constants.Companion.LoggedInMode) {
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.saveUserSession(response)

    }


    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }


}