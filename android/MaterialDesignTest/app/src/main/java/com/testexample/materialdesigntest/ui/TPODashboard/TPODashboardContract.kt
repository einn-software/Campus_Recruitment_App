package com.testexample.materialdesigntest.ui.TPODashboard

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.ui.base.BaseContract

interface TPODashboardContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun showCollegeDetails(college: College)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchCollegeDetails(code: Int)
        fun saveCollegeDetails(code: Int, collegeDetails: UpdateCollegeDetails)
        fun fetchTpoDetails(token: String, id: String)
    }
}