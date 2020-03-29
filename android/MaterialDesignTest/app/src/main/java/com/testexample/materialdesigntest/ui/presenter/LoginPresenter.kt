package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.ui.contract.LoginContract
import com.testexample.materialdesigntest.ui.contract.LoginContract.View
import com.testexample.materialdesigntest.data.model.UserRepository

/**\
 * handles the actions from the view and updates the UI as required
 */
// Presenter Constructor takes view Instance
class LoginPresenter(private var view: View?) :
    LoginContract.Presenter {

    override fun onLogin(userEmail: String, password: String) {

         val user = UserRepository()
         val isLoginSuccess = user.isUserValid(userEmail, password)
         if (isLoginSuccess)
             view?.onLoginResult("Welcome! $userEmail")
         else
             view?.onLoginResult("Login Error!")


    }

    override fun onDestroy() {
        view  = null
    }


}