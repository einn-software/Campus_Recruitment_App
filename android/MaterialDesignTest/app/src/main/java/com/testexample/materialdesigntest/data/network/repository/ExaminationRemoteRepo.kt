package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single


class ExaminationRemoteRepo: IExaminationRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()
    override fun callApiForQuestionPaper(
            token: String,
            fetchExamRequest: FetchExamRequest
    ): Single<QuestionPaper> {
        return api.getQuestionPaper(token,fetchExamRequest.code,
            fetchExamRequest.year, fetchExamRequest.month, fetchExamRequest.date)
    }

    override fun callApiForQuestion(token: String, questionId: String)
            : Single<Question> {
        return api.getQuestion(token, questionId)
    }

    override fun callApiForSavingAnswer(token: String,
                                        request: StudentAnswerRequest)
            : Single<StudentAnswerResponse> {
        return api.addStudentResponse(token, request)
    }

    override fun callApiForUpdatingAnswer(token: String,
                                          request: StudentAnswerResponse)
            : Single<StudentAnswerResponse> {
        return api
                .updateStudentResponse(token, request.id, request.studentAnswer)
    }

    override fun callApiForEndingExam(token: String,
                                      endRequest: EndExamRequest)
            : Single<EndExamResponse> {
        return api.endExam(token, endRequest)
    }
}