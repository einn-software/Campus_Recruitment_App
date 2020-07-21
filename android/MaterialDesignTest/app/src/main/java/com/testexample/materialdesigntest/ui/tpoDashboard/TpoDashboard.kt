package com.testexample.materialdesigntest.ui.tpoDashboard

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.View.INVISIBLE
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.session.SessionManager
import com.testexample.materialdesigntest.ui.login.LoginActivity
import com.testexample.materialdesigntest.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.appbar.*


class TPODashboard : AppCompatActivity(R.layout.activity_tpo_dashboard), TPODashboardContract.View {

    private var exit: Boolean = false
    val TAG = "TPODashboard"
    var fragmentTag = ""
    private lateinit var presenter: TPODashboardContract.Presenter
    private var code: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate()")

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_tpo_dashboard)
        setSupportActionBar(appActionBar)

        val sessionManager = SessionManager(this)
        presenter = TPODashboardPresenter(this)
        presenter.fetchTpoDetails(sessionManager.getUserAuthToken().toString(), sessionManager.getUserId().toString())

        val dataUpload = DataUpload.newInstance(sessionManager.getUserEmail()!!)

        uploadDataTab.setOnSingleClickListener {
            HyperLog.d(TAG, "<< updateCollegeTab | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE
            fragmentTag = "dataUpload"
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, dataUpload, fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            HyperLog.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }

        updateCollegeTab.setOnSingleClickListener {
            HyperLog.d(TAG, "<< updateCollegeTab | setOnClickListener")
            fragmentTag = "CollegeDetailsFragment"
            tpoDashboardContainer.visibility = INVISIBLE
            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, CollegeDetailsFragment.newInstance(code), fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            HyperLog.d(TAG, ">> updateCollegeTab | setOnClickListener")
        }

        collegeResultTab.setOnSingleClickListener {
            HyperLog.d(TAG, "<< resultTabText | setOnClickListener")
            tpoDashboardContainer.visibility = INVISIBLE
            fragmentTag = "QuestionPaperListFragment"

            supportFragmentManager.beginTransaction().apply {
                replace(R.id.tpoDashboardFragment, QuestionPaperListFragment.newInstance(code), fragmentTag)
                addToBackStack(fragmentTag)
                commit()
            }
            HyperLog.d(TAG, ">> resultTabText | setOnClickListener")
        }

        tpoLogOutButton.setOnSingleClickListener {
            HyperLog.d(TAG, "<< logoutButton | setOnClickListener")
            sessionManager.saveUserSession(AuthResponse(null, null, null, null))
            startActivity(Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
                this@TPODashboard.finish()
            })
            HyperLog.d(TAG, ">> logoutButton | setOnClickListener")
        }

        HyperLog.d(TAG, ">> onCreate()")
    }

    override fun onBackPressed() {
        if (supportFragmentManager.fragments.isNotEmpty()) {
            var activeFragment = false
            for (it in supportFragmentManager.fragments) {
                if (it.isVisible) {
                    super.onBackPressed()
                    activeFragment = true
                    break
                }
            }
        }
        else {
                if (exit) {
                    val i = Intent(Intent.ACTION_MAIN).apply {
                        addCategory(Intent.CATEGORY_HOME)
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    }
                    startActivity(i)
                } else {
                    Toast.makeText(
                        this, "Press Back again to Exit.",
                        Toast.LENGTH_SHORT
                    ).show()
                    exit = true
                    Handler().postDelayed({
                        exit = false
                    }, 3000)
                }
            }
    }

    override fun showTpoDetails(tpo: TPO) {
        HyperLog.d(TAG, "<< showTpoDetails()")
        tpoNameText.text = tpo.TPOName
        tpoEmailText.text = tpo.TPOEmail
        tpoCollegeCode.text = tpo.TPOCollegeCode.toString()
        tpoCollegeText.text = tpo.TPOCollegeName
        code = tpo.TPOCollegeCode
        HyperLog.d(TAG, ">> showTpoDetails()")
    }

    override fun setPresenter(presenter: TPODashboardContract.Presenter) {
        HyperLog.d(TAG, "<< setPresenter()")
        this.presenter = presenter
        HyperLog.d(TAG, ">> setPresenter()")
    }

    override fun setContext(): Context {
        HyperLog.d(TAG, "<< setContext()")
        HyperLog.d(TAG, ">> setContext()")
        return this.baseContext
    }
}
