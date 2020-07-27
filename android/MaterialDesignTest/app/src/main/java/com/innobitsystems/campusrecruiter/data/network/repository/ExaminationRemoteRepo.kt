package com.innobitsystems.campusrecruiter.data.network.repository

import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.model.Question
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.network.model.*
import com.innobitsystems.campusrecruiter.data.network.retrofit.GetDataServices
import io.reactivex.Single


class ExaminationRemoteRepo : IExaminationRemoteRepo {

    private val TAG = "ExaminationRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForQuestionPaper(token: String, fetchExamRequest: FetchExamRequest): Single<QuestionPaper> {
        HyperLog.d(TAG, "<< callApiForQuestionPaper()")
        HyperLog.d(TAG, ">> callApiForQuestionPaper()")
        return api.getQuestionPaper(token, fetchExamRequest.code, fetchExamRequest.year, fetchExamRequest.month, fetchExamRequest.date)
    }

    override fun callApiForQuestion(token: String, questionId: String): Single<Question> {
        HyperLog.d(TAG, "<< callApiForQuestion()")
        HyperLog.d(TAG, ">> callApiForQuestion()")
        return api.getQuestion(token, questionId)
    }

    override fun callApiForSavingAnswer(token: String, request: StudentAnswerRequest): Single<StudentAnswerResponsePlain> {
        HyperLog.d(TAG, "<< callApiForSavingAnswer(): state : ${request.state}")
        HyperLog.d(TAG, ">> callApiForSavingAnswer()")
        return api.addStudentResponse(token, request)
    }

    override fun callApiForUpdatingAnswer(token: String, request: StudentAnswerResponse): Single<StudentAnswerResponsePlain> {
        HyperLog.d(TAG, "<< callApiForUpdatingAnswer()")
        HyperLog.d(TAG, ">> callApiForUpdatingAnswer()")
        return api.updateStudentResponse(token, request.id, request.studentAnswer)
    }

    override fun callApiForEndingExam(token: String, endRequest: EndExamRequest): Single<MessageResponse> {
        HyperLog.d(TAG, "<< callApiForEndingExam()")
        HyperLog.d(TAG, ">> callApiForEndingExam()")
        return api.endExam(token, endRequest)
    }

    override fun callApiForFetchingAnswerList(token: String, request: EndExamRequest):
            Single<List<StudentAnswerResponsePlain>>{
        return api.getStudentResponse(token, request.studentId, request.questionPaperId)
    }
}