package com.testexample.materialdesigntest.ui.login

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import com.testexample.materialdesigntest.ui.tpoDashboard.TPODashboard
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.activity_tpo_login.*

class TpoLoginActivity : AppCompatActivity(), LoginContract.TpoView {

    private val TAG = "TpoLoginActivity"
    internal lateinit var presenter: LoginContract.TpoPresenter
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_login)

        presenter = TpoLoginPresenter(this)
        progressBar = ProgressBar(this)

        loginButton.setOnSingleClickListener {
            presenter.onTpoLogin(emailText.text.toString(),
                    passwordText.text.toString())
        }

        resetPasswordLink.setOnSingleClickListener {
            val intent = Intent(this, ResetAuthenticationActivity::class.java)
            intent.putExtra(Constants.USERTYPE, "tpo")
            startActivity(intent)
        }

        registrationLink.setOnSingleClickListener {
            Toast.makeText(this, "Registration Not Available", Toast.LENGTH_LONG).show()
            val openURL = Intent(Intent.ACTION_VIEW)
            openURL.data = Uri.parse(Constants.WEBSITE_LINK)
            startActivity(openURL)
        }
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun openMainActivity() {
        startActivity(Intent(this, TPODashboard::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        })
        this@TpoLoginActivity.finish()
    }

    override fun onValidationMessage(errorCode: Int) {
        HyperLog.d(TAG, "<< onValidationMessage")
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
        HyperLog.d(TAG, ">> onValidationMessage")
    }

    override fun showLoading(flag: Boolean) {
        HyperLog.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else {
            progressBar.stopLoading()
        }
        HyperLog.d(TAG, ">> showLoading")
    }

    override fun setPresenter(presenter: LoginContract.TpoPresenter) {
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
