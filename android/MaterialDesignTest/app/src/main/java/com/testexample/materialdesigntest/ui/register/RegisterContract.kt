package com.testexample.materialdesigntest.ui.register

import com.testexample.materialdesigntest.ui.base.BaseContract

interface RegisterContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun onRegisterResult()

    }
    interface Presenter : BaseContract.BasePresenter {
        fun onRegister()
        fun validateCredentials(
            userName : String,
            email : String,
            password : String,
            confirmPassword : String
        ) : String
    }
}