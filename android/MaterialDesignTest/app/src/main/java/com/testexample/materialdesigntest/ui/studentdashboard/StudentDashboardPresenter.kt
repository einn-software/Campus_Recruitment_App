package com.testexample.materialdesigntest.ui.studentdashboard

import com.testexample.materialdesigntest.data.model.Result

class StudentDashboardPresenter(private var view: StudentDashboardContract.View) :
    StudentDashboardContract.Presenter {

    override fun fetchResult(studentRollNo: Long) {
        val result: Result
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}