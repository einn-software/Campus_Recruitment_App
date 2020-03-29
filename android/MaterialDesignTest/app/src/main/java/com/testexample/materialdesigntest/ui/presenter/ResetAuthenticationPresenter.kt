package com.testexample.materialdesigntest.ui.presenter

import android.view.View
import com.testexample.materialdesigntest.data.model.UserRepository
import com.testexample.materialdesigntest.ui.contract.ResetAuthenticationContract

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