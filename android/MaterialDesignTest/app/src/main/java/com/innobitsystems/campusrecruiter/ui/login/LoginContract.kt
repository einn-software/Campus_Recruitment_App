package com.innobitsystems.campusrecruiter.ui.login

import com.innobitsystems.campusrecruiter.data.network.model.CollegeResponse
import com.innobitsystems.campusrecruiter.data.network.model.StudentLoginRequest
import com.innobitsystems.campusrecruiter.ui.base.BaseContract

interface LoginContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun openMainActivity()
        fun onValidationMessage(errorCode: Int)
        fun showLoading(flag: Boolean)
        fun loadSpinner(collegeList: List<CollegeResponse>)


    }
    interface Presenter : BaseContract.BasePresenter {
        fun onStudentLogin(loginRequest: StudentLoginRequest)
        fun generateCollegeList()
    }

    interface TpoView : BaseContract.BaseView<TpoPresenter> {
        fun openMainActivity()
        fun onValidationMessage(errorCode: Int)
        fun showLoading(flag: Boolean)


    }
    interface TpoPresenter : BaseContract.BasePresenter {
        fun onTpoLogin(email : String, password : String)
    }
}