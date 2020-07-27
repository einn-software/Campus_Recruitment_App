package com.innobitsystems.campusrecruiter.ui.result

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.network.model.AuthResponse
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import com.innobitsystems.campusrecruiter.utils.Constants
import kotlinx.android.synthetic.main.appbar.*


class ResultActivity : AppCompatActivity() {

    private var exit: Boolean = false
    val TAG = "Result Activity"
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        setSupportActionBar(appActionBar)

        val bundle: Bundle? = intent.extras
        val code = bundle?.getInt(Constants.CODE)
        val roll = bundle?.getString(Constants.ROLL)
        val questionPaperId = bundle?.getString(Constants.QUESTION_PAPER_ID)
        sessionManager = SessionManager(this)

        val resultInfo = ResultsFragment.newInstance(code, roll, questionPaperId)
        supportFragmentManager
                .beginTransaction()
                .add(R.id.resultsFragmentContainer, resultInfo)
                .addToBackStack(resultInfo.toString())
                .commit()

        HyperLog.d(TAG, ">> onCreate")
    }

    override fun onBackPressed() {
        HyperLog.d(TAG, "Total Fragments in Backstack : "+supportFragmentManager.backStackEntryCount.toString())
        if (supportFragmentManager.backStackEntryCount > 1)
        {
            super.onBackPressed()
        }
        else {
            if (exit) {
                sessionManager.saveUserSession(AuthResponse(null, null, null, null))
                val i = Intent(this, LoginActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                startActivity(i)
                finish()
            } else {
                Toast.makeText(
                    this, "Press Back again to Logout.",
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

