package com.testexample.materialdesigntest.ui.login

import android.util.Log
import androidx.core.text.isDigitsOnly
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

// Presenter Constructor takes view Instance
class LoginPresenter(private var view: LoginContract.View?) :
    LoginContract.Presenter {

    private lateinit var sessionManager: SessionManager
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onStudentLogin(rollNo: String, password: String) {
        userRepository = UserRepository(view!!.setContext())

        when {
            rollNo.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_ROLL_NO_ERROR)
            !rollNo.isDigitsOnly() ->
                view!!.onValidationMessage(Constants.INVALID_ROLL_NO_ERROR)
//            password.isEmpty()->
//                view!!.onValidationMessage(Constants.EMPTY_PASSWORD_ERROR)
          else -> userRepository.let{
              Log.d("LoginPresenter", "subscription started")
              subscriptions
                  .add(
                      userRepository
                          .isStudentValid(rollNo.toLong(), password).subscribeOn(Schedulers.io())
                          .observeOn(AndroidSchedulers.mainThread())
                          .subscribe(
                              { token ->
                                  Log.d("inside passed Auth", "updating session with token \n $token \n")
                                  updateSession(
                                      token,
                                      Constants.Companion
                                          .LoggedInMode.LOGGED_IN_MODE_SERVER
                                  )
                                  userRepository.saveStudent(token)
                                  view!!.openMainActivity()
                              },
                              { error -> Log.d("REQUEST FAILED !! ", error.toString()) }
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