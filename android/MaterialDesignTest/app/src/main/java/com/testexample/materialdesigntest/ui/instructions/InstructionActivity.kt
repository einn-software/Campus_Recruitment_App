package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.ui.examination.ExamDrawer
import kotlinx.android.synthetic.main.activity_instruction.*
import kotlinx.android.synthetic.main.appbar.*
import java.sql.Date
import java.text.DateFormat
import java.util.*


class InstructionActivity : AppCompatActivity(), InstructionsContract.View {

    private lateinit var presenter: InstructionsContract.Presenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_instruction)

        setSupportActionBar(appActionBar)

        presenter = InstructionPresenter(this)

        val calender = Calendar.getInstance()
        val date = DateFormat.getDateInstance().format(calender.time)
        val d = calender.time

        presenter!!.fetchInstructions("515", d)

        agreeToGuidelinesCheck.setOnClickListener {
            startTestButton.isEnabled = agreeToGuidelinesCheck.isChecked
        }

        startTestButton.setOnClickListener {

            startActivity(Intent(this,ExamDrawer::class.java))
        }
    }

    override fun showInstructions(instruction: Instructions) {
        guidelinesText.text = instruction.message
    }

    override fun setPresenter(presenter: InstructionsContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.baseContext
    }
}