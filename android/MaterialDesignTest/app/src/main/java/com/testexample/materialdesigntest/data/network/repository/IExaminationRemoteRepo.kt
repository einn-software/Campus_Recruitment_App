package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import io.reactivex.Single


interface IExaminationRemoteRepo {

    fun callApiForQuestionPaper(token: String, fetchExamRequest: FetchExamRequest ):
            Single<QuestionPaper>

    fun callApiForQuestion(token: String, questionId: String):
            Single<Question>

    fun callApiForSavingAnswer(token: String,
                               request: StudentAnswerRequest)
            : Single<StudentAnswerResponse>

    fun callApiForUpdatingAnswer(token: String,
                                 request: StudentAnswerResponse)
            : Single<StudentAnswerResponse>

    fun callApiForEndingExam(token: String,
                             endRequest: EndExamRequest)
            : Single<EndExamResponse>
}