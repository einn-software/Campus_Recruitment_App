package com.testexample.materialdesigntest.ui.resetAuthentication

import com.testexample.materialdesigntest.data.repository.UserRepository

class ResetAuthenticationPresenter(private  val view : ResetAuthenticationContract.View) :
    ResetAuthenticationContract.Presenter  {

    override fun onResetPasswordRequest(userEmail: String) {

        val user: UserRepository = UserRepository()
        val isUserPresent: Boolean = user.isExistingUser(userEmail)
        if (isUserPresent)
            view?.onResetRequestComplete("Reset Request sent to $userEmail")
        else
            view?.onResetRequestComplete("No user found !")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }


}