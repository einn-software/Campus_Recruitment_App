package com.testexample.materialdesigntest.ui.studentdashboard

import com.testexample.materialdesigntest.data.model.Result

class StudentDashboardPresenter(private var view: StudentDashboardContract.View) :
    StudentDashboardContract.Presenter {

    override fun fetchResult(studentRollNo: Long): Result {
        return Result("1455","774",
            60,35,25,
            100, 45)
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}