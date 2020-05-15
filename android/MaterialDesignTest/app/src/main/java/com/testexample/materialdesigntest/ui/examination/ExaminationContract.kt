package com.testexample.materialdesigntest.ui.examination

import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.ui.base.BaseContract

interface ExaminationContract {
    interface View:BaseContract.BaseView<Presenter> {
        fun setExamPaper(questionPaper: QuestionPaperComplete)

    }

    interface Presenter:BaseContract.BasePresenter {
        fun loadExam(collegeCode: String, date: String)
        fun saveResponse(response: Response)
    }
}