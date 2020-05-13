package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import com.testexample.materialdesigntest.data.network.model.ExamRequest
import io.reactivex.Flowable
import io.reactivex.Single


class ExaminationRemoteRepo: IExaminationRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()
    override fun callApiForQuestionPaper(
        code: String,
        date: String
    ): Single<QuestionPaperComplete> {
        return api.getQuestionPaper(ExamRequest(code, date))
    }

    override fun callApiForQuestion(questionId: String): Single<Question> {
        return api.getQuestion()
    }
}