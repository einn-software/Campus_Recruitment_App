package com.testexample.materialdesigntest.ui.TPODashboard

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View.INVISIBLE
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.appbar.*

class TPODashboard : AppCompatActivity() {

    val TAG = "TPODashboard"
    private lateinit var presenter:  TPODashboardContract.Presenter
    val code = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG,"<< onCreate()")

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_dashboard)
        setSupportActionBar(appActionBar)

        val dataUpload = DataUpload.newInstance()
        val collegeDetails = CollegeDetailsFragment.newInstance()

        uploadDataTab.setOnClickListener {
            Log.d(TAG,"<< updateCollegeTab | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, dataUpload)
                addToBackStack(dataUpload.toString())
                commit()
            }
            Log.d(TAG,">> updateCollegeTab | setOnClickListener")
        }

        updateCollegeTab.setOnClickListener {
            Log.d(TAG,"<< updateCollegeTab | setOnClickListener")

            tpoDashboardContainer.visibility = INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, collegeDetails)
                addToBackStack(collegeDetails.toString())
                commit()
            }
            Log.d(TAG,">> updateCollegeTab | setOnClickListener")
        }
        Log.d(TAG,">> onCreate()")
    }
}
