package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.GetDataServices
import com.testexample.materialdesigntest.data.network.model.ExamRequest
import io.reactivex.Flowable
import java.util.*


class ExaminationRemoteRepo: IExaminationRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()
    override fun callApiForQuestionPaper(
        code: String,
        date: Date
    ): Flowable<QuestionPaper> {
        return api.getQuestionPaper(ExamRequest(code, date))
    }

    override fun callApiForQuestion(questionId: String): Flowable<Question> {
        return api.getQuestion()
    }
}