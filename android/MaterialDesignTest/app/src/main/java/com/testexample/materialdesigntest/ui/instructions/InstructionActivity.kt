package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.ui.examination.ExamDrawer
import com.testexample.materialdesigntest.ui.login.LoginPrompt
import kotlinx.android.synthetic.main.activity_instruction.*
import kotlinx.android.synthetic.main.appbar.*
import java.text.DateFormat
import java.util.*


class InstructionActivity : AppCompatActivity() {

    val TAG = "Instruction Activity"
    private lateinit var examInfo: ExamInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, " on create")
        setContentView(R.layout.activity_instruction)

        setSupportActionBar(appActionBar)

        examInfo = ExamInfo.newInstance()
        supportFragmentManager
                .beginTransaction()
                .add(R.id.instructionsFragmentContainer, examInfo)
                .addToBackStack(examInfo.toString())
                .commit()
    }
}
