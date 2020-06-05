package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single


class ExaminationRemoteRepo: IExaminationRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()
    override fun callApiForQuestionPaper(
        token: String,
        fetchExamRequest: FetchExamRequest
    ): Single<QuestionPaperComplete> {
        return api.getQuestionPaper(token,fetchExamRequest.code,
            fetchExamRequest.year, fetchExamRequest.month, fetchExamRequest.date)
    }

    override fun callApiForQuestion(token: String, questionId: String): Single<Question> {
        return api.getQuestion(token, questionId)
    }

    override fun callApiForSavingAnswer(request: StudentAnswerRequest)
            : Single<StudentAnswerResponse> {
        return api.addStudentResponse(request)
    }

    override fun callApiForUpdatingAnswer(request: StudentAnswerResponse)
            : Single<StudentAnswerResponse> {
        return api.updateStudentResponse(request.id, request.studentAnswer)
    }

    override fun callApiForEndingExam(endRequest: EndExamRequest)
            : Single<EndExamResponse> {
        return api.endExam(endRequest)
    }
}