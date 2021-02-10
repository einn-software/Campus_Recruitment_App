package com.testexample.materialdesigntest.ui.instructions

import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.ui.base.BaseContract


interface InstructionsContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun showInstructions(instruction: Instructions)
    }

    interface Presenter : BaseContract.BasePresenter {
        fun fetchInstructions(instructionId: String)
    }

    interface ExamInfoView: BaseContract.BaseView<ExamInfoPresenter>{
        fun showExamInfo(questionPaper: QuestionPaper?)
        fun showLoading(flag: Boolean)
        fun openNextFragment(questionPaper: QuestionPaper, student: Student)
        var resultAvailable: Boolean

    }

    interface ExamInfoPresenter: BaseContract.BasePresenter{
        var  student: Student
        fun fetchExamInfo(request: FetchExamRequest)
        fun fetchCollegeCode(year: Int, month: Int, dayOfMonth: Int)
        fun fetchExamResult(code: Int, roll: String, question_paper_id: String)

    }
}