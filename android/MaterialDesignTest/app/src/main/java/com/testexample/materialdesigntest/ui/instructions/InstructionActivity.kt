package com.testexample.materialdesigntest.ui.instructions

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.examination.ExaminationActivity
import kotlinx.android.synthetic.main.activity_instruction.*
import kotlinx.android.synthetic.main.appbar.*

class InstructionActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_instruction)

        setSupportActionBar(appActionBar)

        agreeToGuidelinesCheck.setOnClickListener {
            startTestButton.isEnabled = agreeToGuidelinesCheck.isChecked
        }

        startTestButton.setOnClickListener {
            startActivity(Intent(this,ExaminationActivity::class.java))
        }
    }
}
