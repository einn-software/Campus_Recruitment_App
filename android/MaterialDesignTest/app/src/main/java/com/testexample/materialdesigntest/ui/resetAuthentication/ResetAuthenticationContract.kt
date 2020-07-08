package com.testexample.materialdesigntest.ui.resetAuthentication

import com.testexample.materialdesigntest.ui.base.BaseContract

interface ResetAuthenticationContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun onResetRequestComplete(message : String)

    }
    interface Presenter : BaseContract.BasePresenter {
        fun onResetPasswordRequest(email : String, userType: String)
    }
}