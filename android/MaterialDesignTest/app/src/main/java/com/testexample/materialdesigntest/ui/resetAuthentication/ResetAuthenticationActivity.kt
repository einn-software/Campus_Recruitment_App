package com.testexample.materialdesigntest.ui.resetAuthentication

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.login.LoginActivity
import kotlinx.android.synthetic.main.activity_reset_authentication.*
import kotlinx.android.synthetic.main.appbar.*

class ResetAuthenticationActivity : AppCompatActivity(), ResetAuthenticationContract.View {

    val tag = "Reset Authentication"
    private lateinit var presenter: ResetAuthenticationContract.Presenter
    private var userType : String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reset_authentication)
        Log.d(tag, "on Create")
        setSupportActionBar(appActionBar)

        //get user type from previous activity
        val  bundle: Bundle? = intent.extras
        userType = bundle?.getString("user_type").toString()

        presenter = ResetAuthenticationPresenter(this)

        resetPasswordProcessText.text = getString(R.string.reset_password_process)
        requestResetButton.isEnabled = true
        loginRedirectButton.isEnabled = !requestResetButton.isEnabled

        requestResetButton.setOnClickListener {
            presenter.onResetPasswordRequest(resetEmailText.text.toString(), userType)
        }

        loginRedirectButton.setOnClickListener{
            startActivity(Intent(this, LoginActivity::class.java))
        }
    }

    override fun setPresenter(presenter: ResetAuthenticationContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.baseContext
    }

    override fun onResetRequestComplete(message: String) {
        if (!message.toBoolean()) {
            resetPasswordProcessText.text = getString(R.string.email_not_registered_message,
                resetEmailText.text.toString())
        }
        else {
            resetPasswordProcessText.text = message
        }
        requestResetButton.isEnabled = false
        loginRedirectButton.isEnabled = true
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }
}
