package com.testexample.materialdesigntest.ui.TPODashboard

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View.INVISIBLE
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.session.SessionManager
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.appbar.*


class TPODashboard() : AppCompatActivity(R.layout.activity_tpo_dashboard), TPODashboardContract.View {

    val TAG = "TPODashboard"
    private lateinit var presenter: TPODashboardContract.Presenter
    val code = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onCreate()")

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_dashboard)
        setSupportActionBar(appActionBar)

        var sessionManager = SessionManager(this)
        presenter = TPODashboardPresenter(this)
        presenter.fetchTpoDetails(sessionManager.getUserAuthToken().toString(), "5eeb257218b0eeb44966b3b5")

        val dataUpload = DataUpload.newInstance()
        val collegeDetails = CollegeDetailsFragment.newInstance()

        uploadDataTab.setOnClickListener {
            Log.d(TAG, "<< updateCollegeTab | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, dataUpload)
                addToBackStack(dataUpload.toString())
                commit()
            }
            Log.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }

        updateCollegeTab.setOnClickListener {
            Log.d(TAG, "<< updateCollegeTab | setOnClickListener")

            tpoDashboardContainer.visibility = INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, collegeDetails)
                addToBackStack(collegeDetails.toString())
                commit()
            }
            Log.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }
        Log.d(TAG, ">> onCreate()")
    }

    override fun showTpoDetails(tpo: TPO) {
        Log.d(TAG, "<< showTpoDetails()")
        tpoNameText.text = tpo.TPOName
        tpoEmailText.text = tpo.TPOEmail
        tpoCollegeCode.text = tpo.TPOCollegeCode.toString()
        Log.d(TAG, ">> showTpoDetails()")
    }

    override fun setPresenter(presenter: TPODashboardContract.Presenter) {
        Log.d(TAG, "<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG, ">> setPresenter()")
    }

    override fun setContext(): Context {
        Log.d(TAG, "<< setContext()")
        Log.d(TAG, ">> setContext()")
        return this.baseContext
    }
}
