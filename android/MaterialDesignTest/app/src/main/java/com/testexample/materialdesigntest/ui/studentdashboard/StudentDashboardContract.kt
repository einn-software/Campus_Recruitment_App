package com.testexample.materialdesigntest.ui.studentdashboard

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.ui.base.BaseContract

interface StudentDashboardContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun requestResult(studentRollNo:Long)

    }
    interface Presenter : BaseContract.BasePresenter {
        fun fetchResult(studentRollNo: Long):Result

    }
}