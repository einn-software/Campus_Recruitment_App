package com.testexample.materialdesigntest.ui.resetAuthentication

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.login.LoginActivity
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.activity_reset_authentication.*
import kotlinx.android.synthetic.main.appbar.*

class ResetAuthenticationActivity : AppCompatActivity(), ResetAuthenticationContract.View {

    private val TAG = "ResetAuthenticationActivity"
    private lateinit var presenter: ResetAuthenticationContract.Presenter
    private var userType: String = ""

    @SuppressLint("LongLogTag")
    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reset_authentication)
        setSupportActionBar(appActionBar)

        //get user type from previous activity
        val bundle: Bundle? = intent.extras
        userType = bundle?.getString(Constants.USERTYPE).toString()

        presenter = ResetAuthenticationPresenter(this)

        resetPasswordProcessText.text = getString(R.string.reset_password_process)
        requestResetButton.isEnabled = true
        loginRedirectButton.visibility = View.INVISIBLE

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
        HyperLog.d(TAG, "<< onResetRequestComplete")
        if (!message.toBoolean()) {
            resetPasswordProcessText.text = getString(R.string.email_not_registered_message,
                    resetEmailText.text.toString())
        } else {
            resetPasswordProcessText.text = message
            requestResetButton.isEnabled = false
            requestResetButton.visibility = View.INVISIBLE
            loginRedirectButton.visibility = View.VISIBLE
            loginRedirectButton.isEnabled = true
        }

        HyperLog.d(TAG, ">> onResetRequestComplete")
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }
}
