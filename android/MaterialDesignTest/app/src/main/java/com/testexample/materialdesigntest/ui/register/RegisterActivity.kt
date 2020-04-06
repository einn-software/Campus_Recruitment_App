package com.testexample.materialdesigntest.ui.register

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_register.*

class RegisterActivity : AppCompatActivity(), RegisterContract.View {

    internal lateinit var presenter: RegisterContract.Presenter

    var userName = userNameText.text
    var email = emailText.text
    var password = passwordText.text
    var confirmPassword = confirmPasswordText.text


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        presenter =
            RegisterPresenter(this)
    }

    override fun onRegisterResult() {
        TODO("Not yet implemented")
    }

    override fun setPresenter(presenter: RegisterContract.Presenter) {
        this.presenter = presenter
    }
}
