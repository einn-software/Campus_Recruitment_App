package com.testexample.materialdesigntest.ui.login

import android.util.Log
import android.widget.Toast
import androidx.core.text.isDigitsOnly
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class LoginPresenter(private var view: LoginContract.View?) : LoginContract.Presenter {

    private val TAG = "LoginPresenter"
    private lateinit var sessionManager: SessionManager
    private lateinit var userRepository: IUserRepository
    private var subscriptions = CompositeDisposable()

    override fun onStudentLogin(loginRequest: StudentLoginRequest) {
        Log.d(TAG, "<< onStudentLogin")
        userRepository = UserRepository()

        when {
            loginRequest.rollNo.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_ROLL_NO_ERROR)
            !loginRequest.rollNo.isDigitsOnly() ->
                view!!.onValidationMessage(Constants.INVALID_ROLL_NO_ERROR)
            loginRequest.password.isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_PASSWORD_ERROR)
            loginRequest.code.toString().isEmpty() ->
                view!!.onValidationMessage(Constants.EMPTY_CODE_ERROR)
            else -> userRepository.let {
                Log.d("LoginPresenter", "subscription started")
                view!!.showLoading(true)
                subscriptions.add(
                        userRepository
                                .isStudentValid(loginRequest)
                                .handelNetworkError()
                                .subscribeOn(Schedulers.io())
                                .observeOn(AndroidSchedulers.mainThread())
                                .subscribe(
                                        { session ->
                                            updateSession(session)
                                            view!!.showLoading(false)
                                            view!!.openMainActivity()
                                            Log.i(TAG, "Successfully validate Student")
                                        },
                                        { error ->
                                            Log.e(TAG, "Error in validate student: ${error.localizedMessage}")
                                            view!!.showLoading(false)
                                            Toast.makeText(view!!.setContext(),
                                                    error.localizedMessage, Toast.LENGTH_SHORT).show()
                                        } ))
            }
        }
        Log.d(TAG, ">> onStudentLogin")
    }

    override fun generateCollegeList() {
        Log.d(TAG, "<< generateCollegeList")
        var collegeList: List<CollegeResponse> = emptyList()
        userRepository = UserRepository()

        view.let {
            userRepository.getCollegeList()
                    .subscribeOn(Schedulers.io())
                    .observeOn(AndroidSchedulers.mainThread())
                    .handelNetworkError()
                    .subscribe(
                            { college ->
                                Log.i(TAG, "Successfully fetch college list")
                                collegeList = college
                            },
                            { error ->
                                Log.e(TAG, "Error in fetching college list ${error.message.toString()}")
                                Toast.makeText(view!!.setContext(), "${error.message}",
                                Toast.LENGTH_LONG).show()
                            },
                            {
                                Log.d(TAG, "Fetch query for college list completed")
                                view!!.loadSpinner(collegeList)
                            }
                    )
        }
        Log.d(TAG, ">> generateCollegeList")

    }

    private fun updateSession(session: AuthResponse) {
        Log.d(TAG, "<< updateSession")
        sessionManager = SessionManager(view!!.setContext())
        sessionManager.saveUserSession(session)
        Log.d(TAG, ">> updateSession")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}