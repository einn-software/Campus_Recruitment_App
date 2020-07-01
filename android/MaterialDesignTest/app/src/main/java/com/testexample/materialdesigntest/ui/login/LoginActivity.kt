package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Toast
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.ProgressBar

class LoginActivity : AppCompatActivity() {
    private var exit: Boolean = false
    private val TAG = "LoginActivity"

    private lateinit var loginPrompt: LoginPrompt

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "<< onCreate")
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
        Log.d(TAG, ">> onCreate")
    }

    override fun onBackPressed() {
        Log.d(TAG, "Total Fragments in Backstack : "+supportFragmentManager.backStackEntryCount.toString())
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

