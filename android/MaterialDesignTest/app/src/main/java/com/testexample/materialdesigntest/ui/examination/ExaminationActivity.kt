package com.testexample.materialdesigntest.ui.examination

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toolbar
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_examination.*
import kotlinx.android.synthetic.main.appbar.*

class ExaminationActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_examination)

        setSupportActionBar(appActionBar)

//        selectsection.setOnClickListener {
//            supportFragmentManager.beginTransaction().apply {
//            replace(R.id.question_Fragment,)
//            addToBackStack("studentLogin")
//            commit() }

    }
}
