package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.ui.contract.RegisterContract

class RegisterPresenter(private var view: RegisterContract.View) :
    RegisterContract.Presenter {

    override fun onRegister() {
    }

    override fun validateCredentials(
        userName : String,
        email : String,
        password : String,
        confirmPassword : String): String {
        if(userName.isEmpty()){
            print("Please Enter Username")
        }
            return "valid user"

    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}