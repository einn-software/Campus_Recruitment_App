package com.testexample.materialdesigntest.ui.examination

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.ui.base.BaseContract

interface ExaminationContract {
    interface View:BaseContract.BaseView<Presenter> {
        fun setExamPaper(questionPaper: QuestionPaper)
        fun showLoading(flag: Boolean)
        fun openNextActivity()
    }

    interface  FragmentView: BaseContract.BaseView<FragmentPresenter>{
        fun createResponse(state: Int): StudentAnswerResponse
        fun setQuestion(viewId: Int, question: Question, answer: ExaminationSectionPresenter.Answer)
    }

    interface FragmentPresenter: BaseContract.BasePresenter{
        fun saveResponse(response: StudentAnswerResponse)
        fun loadQuestion(viewId: Int, questionId: String)
        fun getView(viewSent: FragmentView)
    }

    interface Presenter:BaseContract.BasePresenter {
        fun loadExam(fetchExamRequest: FetchExamRequest)
        fun endExam(endExamRequest: EndExamRequest)


    }
}