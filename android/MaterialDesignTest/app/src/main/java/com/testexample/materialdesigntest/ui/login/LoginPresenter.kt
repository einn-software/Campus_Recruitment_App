package com.testexample.materialdesigntest.ui.login

import com.testexample.materialdesigntest.ui.login.LoginContract.View
import com.testexample.materialdesigntest.data.repository.UserRepository

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
             view?.onLoginResult("success")
         else
             view?.onLoginResult("Login Error!")


    }

    override fun onDestroy() {
        view  = null
    }


}