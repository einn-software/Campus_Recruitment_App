package com.testexample.materialdesigntest.ui.studentdashboard

import com.testexample.materialdesigntest.data.model.Result

class StudentDashboardPresenter(private var view: StudentDashboardContract.View) :
    StudentDashboardContract.Presenter {

    override fun fetchResult(studentRollNo: Long): Result {
        return Result("ABC",
                "1457",
        802,
        "12345",
        20,
        10,
        40,
        25,
        100)
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}