package com.testexample.materialdesigntest.ui.TPODashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View.INVISIBLE
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.appbar.*

class TPODashboard : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_dashboard)
        setSupportActionBar(appActionBar)

        val dataUpload = DataUpload.newInstance()

        uploadDataTab.setOnClickListener {
            tpoDashboardContainer.visibility = INVISIBLE

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.collegeDetailsTable, dataUpload)
                addToBackStack(dataUpload.toString())
                commit()
            }
        }

        /*collegeDataTabText.setOnClickListener {
            tpoDashboardContainer.visibility = INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.collegeDetailsTable, dataUpload)
                addToBackStack(dataUpload.toString())
                commit()
            }
        }*/
    }
}
