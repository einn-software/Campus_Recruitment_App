package com.testexample.materialdesigntest.ui.instructions

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.appbar.*


class InstructionActivity : AppCompatActivity() {

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
}
