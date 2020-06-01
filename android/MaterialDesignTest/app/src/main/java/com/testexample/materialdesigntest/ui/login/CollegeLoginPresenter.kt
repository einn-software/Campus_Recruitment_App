package com.testexample.materialdesigntest.ui.login

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



/**\
 * handles the actions from the view and updates the UI as required
 */
// Presenter Constructor takes view Instance
class CollegeLoginPresenter(private var view: LoginContract.CollegeView?) :
    LoginContract.CollegePresenter {

    private lateinit var sessionManager: SessionManager
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onCollegeLogin(email: String, password: String) {
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
                subscriptions.add(userRepository
                    .isCollegeValid(email, password)
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .subscribe(
                        { token ->
                            updateSession(
                                token.token,
                                Constants.Companion
                                    .LoggedInMode.LOGGED_IN_MODE_SERVER
                            )
                            view!!.openMainActivity()
                        },
                        { error -> Log.d("College Login Presenter", error.toString()) }
                    ))
            }
        }

    }

    private fun updateSession(token: String, loginStatus: Constants.Companion.LoggedInMode) {
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.saveAuthToken(token)
    }


    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }


}