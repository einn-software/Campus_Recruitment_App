package com.testexample.materialdesigntest.ui.login

import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.ui.base.BaseContract

/**
 * Defines the contract between view (LoginActivity) and the presenter
 */

interface LoginContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun openMainActivity()
        fun onValidationMessage(errorCode: Int)
        fun showLoading(flag: Boolean)
        fun loadSpinner(collegeList: List<CollegeResponse>)


    }
    interface Presenter : BaseContract.BasePresenter {
        fun onStudentLogin(rollNo : String, password : String)
        fun generateCollegeList()
    }

    interface CollegeView : BaseContract.BaseView<CollegePresenter> {
        fun openMainActivity()
        fun onValidationMessage(errorCode: Int)
        fun showLoading(flag: Boolean)


    }
    interface CollegePresenter : BaseContract.BasePresenter {
        fun onCollegeLogin(email : String, password : String)
    }
}