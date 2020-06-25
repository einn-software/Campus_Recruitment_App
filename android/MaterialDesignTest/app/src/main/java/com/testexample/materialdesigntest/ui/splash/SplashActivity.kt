package com.testexample.materialdesigntest.ui.splash

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.login.LoginActivity

class SplashActivity : AppCompatActivity() {

    private val SPLASH_TIME_OUT:Long = 3000 // 3 sec
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        Handler().postDelayed({
            startActivity(Intent(this,LoginActivity::class.java))
            finish()
        }, SPLASH_TIME_OUT)
    }
}