package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import io.reactivex.Single


interface IExaminationRemoteRepo {

    fun callApiForQuestionPaper(token:String, code: String, date: String):
            Single<QuestionPaperComplete>

    fun callApiForQuestion(token: String, questionId: String):
            Single<Question>
}