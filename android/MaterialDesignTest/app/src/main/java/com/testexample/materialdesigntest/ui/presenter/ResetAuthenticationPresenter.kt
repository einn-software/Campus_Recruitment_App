package com.testexample.materialdesigntest.ui.presenter

import android.view.View
import com.testexample.materialdesigntest.ui.contract.ResetAuthenticationContract

class ResetAuthenticationPresenter(private  val view : ResetAuthenticationContract.View) :
    ResetAuthenticationContract.Presenter  {

    override fun onResetPassword(email: String) {
        TODO("API call here")

        view.onResetComplete(message = "password reset")

    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}