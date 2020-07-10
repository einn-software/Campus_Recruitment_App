package com.testexample.materialdesigntest.ui.instructions

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.appbar.*


class InstructionActivity : AppCompatActivity() {

    private var exit: Boolean = false
    val TAG = "Instruction Activity"
    private lateinit var examInfo: ExamInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "<< onCreate")
        setContentView(R.layout.activity_instruction)

        setSupportActionBar(appActionBar)

        examInfo = ExamInfo.newInstance()
        supportFragmentManager
                .beginTransaction()
                .add(R.id.instructionsFragmentContainer, examInfo)
                .addToBackStack(examInfo.toString())
                .commit()

        Log.d(TAG, ">> onCreate")
    }

    override fun onBackPressed() {
        Log.d(TAG, "Total Fragments in Backstack : "
                + supportFragmentManager.backStackEntryCount.toString())

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
