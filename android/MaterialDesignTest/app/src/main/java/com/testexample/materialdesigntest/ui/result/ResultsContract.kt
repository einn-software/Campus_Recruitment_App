package com.testexample.materialdesigntest.ui.result

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.ui.base.BaseContract

interface ResultsContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun showResults(result: Result)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchStudentResult(code: Int, roll: String, question_paper_id: String)
    }
}