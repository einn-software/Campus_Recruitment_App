package com.testexample.materialdesigntest.ui.tpoDashboard

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View.INVISIBLE
import androidx.appcompat.app.AppCompatActivity
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.ui.login.LoginActivity
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.appbar.*


class TPODashboard() : AppCompatActivity(R.layout.activity_tpo_dashboard), TPODashboardContract.View {

    val TAG = "TPODashboard"
    var fragmentTag = ""
    private lateinit var presenter: TPODashboardContract.Presenter
    private var code: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onCreate()")

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_dashboard)
        setSupportActionBar(appActionBar)

        val sessionManager = SessionManager(this)
        presenter = TPODashboardPresenter(this)
        presenter.fetchTpoDetails(sessionManager.getUserAuthToken().toString(), sessionManager.getUserId().toString())

        val dataUpload = DataUpload.newInstance(sessionManager.getUserEmail()!!)

        uploadDataTab.setOnClickListener {
            Log.d(TAG, "<< updateCollegeTab | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE
            fragmentTag = "dataUpload"
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, dataUpload, fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            Log.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }

        updateCollegeTab.setOnClickListener {
            Log.d(TAG, "<< updateCollegeTab | setOnClickListener")
            fragmentTag = "CollegeDetailsFragment"
            tpoDashboardContainer.visibility = INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, CollegeDetailsFragment.newInstance(code), fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            Log.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }

        collegeResultTab.setOnClickListener {
            Log.d(TAG, "<< resultTabText | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE
            fragmentTag = "QuestionPaperListFragment"

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, QuestionPaperListFragment.newInstance(code), fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            Log.d(TAG, ">> resultTabText | setOnClickListener")
        }

        tpoLogOutButton.setOnClickListener {
            Log.d(TAG, "<< logoutButton | setOnClickListener")
            sessionManager.saveUserSession(AuthResponse(null, null, null, null))
            startActivity(Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
                this@TPODashboard.finish()
            })
            Log.d(TAG, ">> logoutButton | setOnClickListener")
        }

        Log.d(TAG, ">> onCreate()")
    }

    override fun showTpoDetails(tpo: TPO) {
        Log.d(TAG, "<< showTpoDetails()")
        tpoNameText.text = tpo.TPOName
        tpoEmailText.text = tpo.TPOEmail
        tpoCollegeCode.text = tpo.TPOCollegeCode.toString()
        tpoCollegeText.text = tpo.TPOCollegeName
        code = tpo.TPOCollegeCode
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
