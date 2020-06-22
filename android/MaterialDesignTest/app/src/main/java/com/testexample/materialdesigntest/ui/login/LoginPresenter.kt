package com.testexample.materialdesigntest.ui.login

import android.util.Log
import androidx.core.text.isDigitsOnly
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
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

    override fun onStudentLogin(loginRequest: StudentLoginRequest) {
        userRepository = UserRepository(view!!.setContext())

        when {
            loginRequest.rollNo.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_ROLL_NO_ERROR)
            !loginRequest.rollNo.isDigitsOnly() ->
                view!!.onValidationMessage(Constants.INVALID_ROLL_NO_ERROR)
            loginRequest.password.isEmpty()->
                view!!.onValidationMessage(Constants.EMPTY_PASSWORD_ERROR)
            !loginRequest.code.toString().isDigitsOnly()->
                view!!.onValidationMessage(Constants.INVALID_CODE_ERROR)
          else -> userRepository.let{
              Log.d("LoginPresenter", "subscription started")
              view!!.showLoading(true)
              subscriptions
                  .add(
                      userRepository
                          .isStudentValid(loginRequest).subscribeOn(Schedulers.io())
                          .observeOn(AndroidSchedulers.mainThread())
                          .subscribe(
                              { session ->
                                  Log.d("inside passed Auth", "updating session with email \n ${session.email} \n")
                                  updateSession(session)
                                  userRepository.saveStudent(session.token)
                                  view!!.showLoading(false)
                                  view!!.openMainActivity()
                              },
                              { error -> Log.d("REQUEST FAILED !! ", error.message.toString())
                              }
                          ))
          }
        }
    }

    override fun generateCollegeList() {
        Log.d("Presenter","generate College List")
        var collegeList: List<CollegeResponse> = emptyList()
        userRepository = UserRepository(view!!.setContext())

        view.let {
            userRepository.getCollegeList()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .handelNetworkError()
                .subscribe(
                    {college ->
                        Log.d("generate college List","onNext")
                        collegeList = college
                    },
                    {error ->
                        Log.d("generate college List","onError")
                        println(error.localizedMessage)
                    },
                    {
                        Log.d("generate college List","onComplete")
                        view!!.loadSpinner(collegeList)
                    }
                )
        }

    }

    private fun updateSession(session: AuthResponse) {
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.saveUserSession(session)
    }

    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }
}