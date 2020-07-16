package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R

class LoginActivity : AppCompatActivity() {
    private var exit: Boolean = false
    private val TAG = "LoginActivity"

    private lateinit var loginPrompt: LoginPrompt

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        HyperLog.d(TAG, "<< onCreate")
        setContentView(R.layout.activity_login)

        if (null != this.findViewById(R.id.loginFragment)) {
            if (savedInstanceState != null) {
                return
            }

            loginPrompt = LoginPrompt.newInstance()

            supportFragmentManager
                    .beginTransaction()
                    .add(R.id.loginFragment, loginPrompt)
                    .addToBackStack("LoginPrompt")
                    .commit()
        }
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun onBackPressed() {
        HyperLog.d(TAG, "Total Fragments in back-stack : "+supportFragmentManager.backStackEntryCount.toString())
        if (supportFragmentManager.backStackEntryCount > 1)
        {
            super.onBackPressed()
        }
        else {
            if (exit) {
                val i = Intent(Intent.ACTION_MAIN).apply {
                    addCategory(Intent.CATEGORY_HOME)
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                startActivity(i)
            } else {
                Toast.makeText(
                    this, "Press Back again to Exit.",
                    Toast.LENGTH_SHORT
                ).show()
                exit = true
                Handler().postDelayed({
                    exit = false
                }, 3000)
            }
        }
    }

}

