package com.testexample.materialdesigntest.ui.studentdashboard

import com.testexample.materialdesigntest.data.model.Result

class StudentDashboardPresenter(private var view: StudentDashboardContract.View) :
    StudentDashboardContract.Presenter {

    override fun fetchResult(studentRollNo: Long): Result {
        return Result("ABC","123456789",803,"1545",15,10,154,121,100)
    }

    override fun onDestroy() {
        TODO("Not yet implemented")
    }

}