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
        token: String,
        code: String,
        date: String
    ): Single<QuestionPaperComplete> {
        return api.getQuestionPaper(token, code)
    }

    override fun callApiForQuestion(token: String, questionId: String): Single<Question> {
        return api.getQuestion(token, questionId)
    }
}