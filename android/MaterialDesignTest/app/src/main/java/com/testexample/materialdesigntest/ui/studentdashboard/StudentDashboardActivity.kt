package com.testexample.materialdesigntest.ui.studentdashboard

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View.INVISIBLE
import androidx.fragment.app.FragmentTransaction
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Result
import kotlinx.android.synthetic.main.activity_student_dashboard.*
import kotlinx.android.synthetic.main.appbar.*

class StudentDashboardActivity : AppCompatActivity(), StudentDashboardContract.View {


    lateinit var studentResult: StudentResult
    private lateinit var presenter: StudentDashboardContract.Presenter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_student_dashboard)

        //init
        presenter = StudentDashboardPresenter(this)

        setSupportActionBar(appActionBar)

        studentResult = StudentResult.newInstance(requestResult(15), 15)

        resultTab.setOnClickListener {
            studentDashboardContainer.visibility = INVISIBLE
            supportFragmentManager
                .beginTransaction()
                .replace(R.id.studentDashboardFragment, studentResult)
                .addToBackStack(studentResult.toString())
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()
        }
    }

    override fun requestResult(studentRollNo: Long):
            Result {

        return presenter.fetchResult(studentRollNo)

    }

    override fun setPresenter(presenter: StudentDashboardContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        TODO("Not yet implemented")
    }
}
