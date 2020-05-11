package com.testexample.materialdesigntest.ui.login

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.collegeDashboard.CollegeDashboard
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.activity_college_login.*

class CollegeLoginActivity : AppCompatActivity(), LoginContract.CollegeView {

    internal lateinit var presenter: LoginContract.CollegePresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_college_login)

        presenter = CollegeLoginPresenter(this)

        loginButton.setOnClickListener {
            presenter.onCollegeLogin(emailText.text.toString(),
                passwordText.text.toString())
        }

        ResetPasswordLink.setOnClickListener {
            val intent = Intent(this, ResetAuthenticationActivity::class.java)
            startActivity(intent)
        }

        RegistrationLink.setOnClickListener {
            //redirect to website
        }
    }

    override fun openMainActivity() {
        startActivity(Intent(this, CollegeDashboard::class.java))
    }

    override fun onValidationMessage(errorCode: Int) {
        when (errorCode) {
            Constants.EMPTY_EMAIL_ERROR ->
                Toast.makeText(this, getString(R.string.empty_email_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.INVALID_EMAIL_ERROR ->
                Toast.makeText(this, getString(R.string.invalid_email_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.EMPTY_PASSWORD_ERROR ->
                Toast.makeText(this, getString(R.string.empty_password_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.LOGIN_FAILURE ->
                Toast.makeText(this, getString(R.string.login_failure),
                    Toast.LENGTH_LONG).show()
        }
    }

    override fun showLoading(flag: Boolean) {
        TODO("Not yet implemented")
    }

    override fun setPresenter(presenter: LoginContract.CollegePresenter) {
        this.presenter = presenter

    }

    override fun setContext(): Context {
        return this.baseContext
    }

    //  Notify
    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }


}
