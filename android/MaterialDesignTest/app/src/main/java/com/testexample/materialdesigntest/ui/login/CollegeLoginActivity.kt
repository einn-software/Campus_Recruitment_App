package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.collegedashboard.CollegeDashboard
import com.testexample.materialdesigntest.ui.register.RegisterActivity
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import kotlinx.android.synthetic.main.activity_college_login.*

class CollegeLoginActivity : AppCompatActivity(), LoginContract.View {

    // view needs presenter to invoke user initiated callback -- add a presenter property
    internal lateinit var presenter: LoginContract.Presenter

    //

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_college_login)


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
        if (message == "success") {
            startActivity(Intent(this, CollegeDashboard::class.java))
        }
        else {
            onErrorTransition()
            loginMessage.text = message
        }

    }

    private fun onErrorTransition() {
        loginMessage.visibility = View.VISIBLE
        emailText.visibility = View.GONE
        passwordText.visibility = View.GONE
        loginButton.visibility = View.GONE
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
