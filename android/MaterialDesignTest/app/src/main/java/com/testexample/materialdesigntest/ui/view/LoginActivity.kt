package com.testexample.materialdesigntest.ui.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View.GONE
import android.view.View.VISIBLE
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.contract.LoginContract
import com.testexample.materialdesigntest.ui.presenter.LoginPresenter
import kotlinx.android.synthetic.main.activity_login.*

// LoginActivity extends AppCompactActivity and implements LoginContract.View

class LoginActivity : AppCompatActivity(), LoginContract.View {


    // view needs presenter to invoke user initiated callback -- add a presenter property
    internal lateinit var presenter: LoginContract.Presenter

    //
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        //    init
        presenter =
            LoginPresenter(this)

        loginButton.setOnClickListener {
            presenter.onLogin(emailText.text.toString(), passwordText.text.toString())
        }

        ResetPasswordLink.setOnClickListener {
            val intent = Intent(this, ResetAuthenticationActivity::class.java)
            startActivity(intent)
        }

        RegistrationLink.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

         /*   if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    // call material design here
            }
            else {
                // call non-material design here
            } */
    }

    override fun onLoginResult(message: String) {
        welcomeTransition()
        loginMessage.text = message
        println(loginMessage.text)
    }

    private fun welcomeTransition() {
        loginMessage.visibility = VISIBLE
        emailText.visibility = GONE
        passwordText.visibility = GONE
        loginButton.visibility = GONE
    }

    override fun setPresenter(presenter: LoginContract.Presenter) {
        this.presenter = presenter

    }

//  Notify
    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }
}
