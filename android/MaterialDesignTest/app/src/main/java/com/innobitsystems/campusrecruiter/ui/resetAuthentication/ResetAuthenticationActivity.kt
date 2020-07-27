package com.innobitsystems.campusrecruiter.ui.resetAuthentication

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View.INVISIBLE
import android.view.View.VISIBLE
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.ui.ProgressBar
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.activity_reset_authentication.*
import kotlinx.android.synthetic.main.appbar.*

class ResetAuthenticationActivity : AppCompatActivity(), ResetAuthenticationContract.View {

    private val TAG = "ResetAuthenticationActivity"
    private lateinit var presenter: ResetAuthenticationContract.Presenter
    private var userType: String = ""
    private lateinit var progressBar : ProgressBar

    @SuppressLint("LongLogTag")
    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reset_authentication)
        setSupportActionBar(appActionBar)
        progressBar = ProgressBar(this)

        //get user type from previous activity
        val bundle: Bundle? = intent.extras
        userType = bundle?.getString(Constants.USERTYPE).toString()

        presenter = ResetAuthenticationPresenter(this)

        resetPasswordProcessText.text = getString(R.string.reset_password_process)
        requestResetButton.isEnabled = true
        loginRedirectButton.visibility = INVISIBLE

        requestResetButton.setOnSingleClickListener {
            presenter.onResetPasswordRequest(resetEmailText.text.toString(), userType)
        }

        loginRedirectButton.setOnSingleClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun setPresenter(presenter: ResetAuthenticationContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.baseContext
    }

    @SuppressLint("LongLogTag")
    override fun onResetRequestComplete(message: String) {
        HyperLog.d(TAG, "<< onResetRequestComplete $message")
        if (message == "fail") {
            resetPasswordProcessText.text = getString(R.string.email_not_registered_message,
                    resetEmailText.text.toString())
        }
        else {
            resetResponseMessage.text = message
            resetResponseMessage.visibility = VISIBLE
            resetPasswordProcessText.visibility = INVISIBLE
            resetEmailText.visibility = INVISIBLE
            requestResetButton.isEnabled = false
            requestResetButton.visibility = INVISIBLE
            loginRedirectButton.visibility = VISIBLE
            loginRedirectButton.isEnabled = true
        }

        HyperLog.d(TAG, ">> onResetRequestComplete")
    }

    override fun showProgress(flag: Boolean){
        if (flag)
            progressBar.startLoading()
        else
            progressBar.stopLoading()
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }
}
