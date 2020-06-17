package com.testexample.materialdesigntest.ui.login

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.ProgressBar

class LoginActivity : AppCompatActivity() {

    private lateinit var loginPrompt: LoginPrompt

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        if (null != this.findViewById(R.id.loginFragment)) {
            if (savedInstanceState != null) {
                return
            }

            loginPrompt = LoginPrompt.newInstance()

            supportFragmentManager
                .beginTransaction()
                .add(R.id.loginFragment, loginPrompt)
                .addToBackStack(loginPrompt.toString())
                .commit()
        }
    }
}
