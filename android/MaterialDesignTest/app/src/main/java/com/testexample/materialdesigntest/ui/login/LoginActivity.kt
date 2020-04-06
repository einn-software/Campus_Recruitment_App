package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View.GONE
import android.view.View.VISIBLE
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.register.RegisterActivity
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import kotlinx.android.synthetic.main.activity_login.*

// LoginActivity extends AppCompactActivity and implements LoginContract.View

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val studentLogin = StudentLogin()

        joinTestButton.setOnClickListener {
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.loginFragment, studentLogin)
                addToBackStack("studentLogin")
                commit()
            }
        }

        collegeLoginButton.setOnClickListener {
            val intent = Intent(this, CollegeLoginActivity::class.java)
            startActivity(intent)
        }


    }
}
