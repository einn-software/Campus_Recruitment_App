package com.testexample.materialdesigntest.ui.result

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.appbar.*


class ResultActivity : AppCompatActivity() {

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

}

