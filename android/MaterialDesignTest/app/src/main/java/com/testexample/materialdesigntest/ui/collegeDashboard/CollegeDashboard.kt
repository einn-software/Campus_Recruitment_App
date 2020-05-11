package com.testexample.materialdesigntest.ui.collegeDashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View.INVISIBLE
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_college_dashboard.*
import kotlinx.android.synthetic.main.appbar.*

class CollegeDashboard : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_college_dashboard)
        setSupportActionBar(appActionBar)

        val dataUpload = DataUpload.newInstance()

        uploadDataTab.setOnClickListener {
            collegeDashboardContainer.visibility = INVISIBLE

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.collegeDashboardFragment, dataUpload)
                addToBackStack(dataUpload.toString())
                commit()
            }
        }
    }
}
