package com.testexample.materialdesigntest.ui.result

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.appbar.*


class ResultActivity : AppCompatActivity() {

    private var exit: Boolean = false
    val TAG = "Result Activity"
    private lateinit var presenter: ResultsContract.Presenter

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)

        setSupportActionBar(appActionBar)

        val bundle: Bundle? = intent.extras
        val code = bundle?.getInt(Constants.CODE)
        val roll = bundle?.getString(Constants.ROLL)
        val questionPaperId = bundle?.getString(Constants.QUESTION_PAPER_ID)

        val resultInfo = ResultsFragment.newInstance(code, roll, questionPaperId)
        supportFragmentManager
                .beginTransaction()
                .add(R.id.resultsFragmentContainer, resultInfo)
                .addToBackStack(resultInfo.toString())
                .commit()

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

