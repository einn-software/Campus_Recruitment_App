package com.testexample.materialdesigntest.ui.collegedashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.testexample.materialdesigntest.R

class CollegeDashboard : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_college_dashboard)

//        setOnClickListener {
//            supportFragmentManager.beginTransaction().apply {
//                replace(R.id.loginFragment, studentLogin)
//                addToBackStack("studentLogin")
//                commit()
//            }
//        }
    }
}
