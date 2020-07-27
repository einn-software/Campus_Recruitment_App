package com.innobitsystems.campusrecruiter.ui.result

import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.ui.base.BaseContract

interface ResultsContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun showResults(result: Result)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchStudentResult(code: Int, roll: String, question_paper_id: String)
    }
}