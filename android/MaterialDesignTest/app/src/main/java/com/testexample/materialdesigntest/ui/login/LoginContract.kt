package com.testexample.materialdesigntest.ui.login

import com.testexample.materialdesigntest.ui.base.BaseContract

/**
 * Defines the contract between view (LoginActivity) and the presenter
 */

interface LoginContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun onLoginResult(message: String)

    }
    interface Presenter : BaseContract.BasePresenter {
        fun onLogin(userEmail : String, password : String)
    }
}