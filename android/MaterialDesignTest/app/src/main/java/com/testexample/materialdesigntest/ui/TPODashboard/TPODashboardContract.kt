package com.testexample.materialdesigntest.ui.TPODashboard

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.ui.base.BaseContract

interface TPODashboardContract {
    interface View : BaseContract.BaseView<TPODashboardContract.Presenter> {
        fun showCollegeDetails(college: College)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchCollegeDetails(code: Int)
        fun saveCollegeDetails(name: String, address: String, university: String, email: String, phone: String)
    }
}