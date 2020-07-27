package com.innobitsystems.campusrecruiter.ui.resetAuthentication

import com.innobitsystems.campusrecruiter.ui.base.BaseContract

interface ResetAuthenticationContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun onResetRequestComplete(message : String)
        fun showProgress(flag: Boolean)

    }
    interface Presenter : BaseContract.BasePresenter {
        fun onResetPasswordRequest(email : String, userType: String)
    }
}