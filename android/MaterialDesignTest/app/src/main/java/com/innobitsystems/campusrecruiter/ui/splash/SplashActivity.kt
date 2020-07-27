package com.innobitsystems.campusrecruiter.ui.splash

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import com.innobitsystems.campusrecruiter.utils.Logger

class SplashActivity : AppCompatActivity() {

    private val SPLASH_TIME_OUT: Long = 2000 // 2 sec
    val REQUEST_ID_MULTIPLE_PERMISSIONS = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        val getLog = Logger()
        getLog.setLogger(this)

        HyperLog.d("SplashActivity(): ", "<< onCreate()")

            Handler().postDelayed({
                if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M)
                    checkAndRequestPermissions()
                startActivity(Intent(this, LoginActivity::class.java))
                finish()
            }, SPLASH_TIME_OUT)
        HyperLog.d("SplashActivity(): ", ">> onCreate()")
    }

    private fun checkAndRequestPermissions(): Boolean {
        val readPhoneState = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE)
        val read_call_log = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CALL_LOG)
        val listPermissionsNeeded = arrayListOf<String>()

        if (readPhoneState != PackageManager.PERMISSION_GRANTED) {
            listPermissionsNeeded.add(Manifest.permission.READ_PHONE_STATE)
        }

        if (read_call_log != PackageManager.PERMISSION_GRANTED) {
            listPermissionsNeeded.add(Manifest.permission.READ_CALL_LOG)
        }

        if (listPermissionsNeeded.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, listPermissionsNeeded.toArray(arrayOfNulls<String>(listPermissionsNeeded.size)),
                    REQUEST_ID_MULTIPLE_PERMISSIONS)
            return false
        }
        return true
    }
}