package com.testexample.materialdesigntest.ui.examination

import com.testexample.materialdesigntest.ui.base.BaseContract

interface ExaminationContract {
    interface View:BaseContract.BaseView<Presenter> {

    }

    interface Presenter:BaseContract.BasePresenter {
        fun loadExam(collegeCode: String, date: String)
    }
}