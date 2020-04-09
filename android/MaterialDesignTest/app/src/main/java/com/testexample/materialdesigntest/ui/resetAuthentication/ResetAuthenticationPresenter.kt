package com.testexample.materialdesigntest.ui.resetAuthentication

import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.data.repository.UserRepository

class ResetAuthenticationPresenter(private  val view : ResetAuthenticationContract.View, private val userRepository:IUserRepository) :
    ResetAuthenticationContract.Presenter  {

    override fun onResetPasswordRequest(userEmail: String) {

        val isUserPresent: Boolean = userRepository.isExistingUser(userEmail)
        if (isUserPresent)
            view.onResetRequestComplete("Reset Request sent to $userEmail")
        else
            view.onResetRequestComplete("No user found !")
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }


}