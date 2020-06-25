package com.testexample.materialdesigntest.data.network.repository

import android.util.Log
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single


class ExaminationRemoteRepo : IExaminationRemoteRepo {

    private val TAG = "ExaminationRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForQuestionPaper(token: String, fetchExamRequest: FetchExamRequest): Single<QuestionPaper> {
        Log.d(TAG, "<< callApiForQuestionPaper()")
        Log.d(TAG, ">> callApiForQuestionPaper()")
        return api.getQuestionPaper(token, fetchExamRequest.code, fetchExamRequest.year, fetchExamRequest.month, fetchExamRequest.date)
    }

    override fun callApiForQuestion(token: String, questionId: String): Single<Question> {
        Log.d(TAG, "<< callApiForQuestion()")
        Log.d(TAG, ">> callApiForQuestion()")
        return api.getQuestion(token, questionId)
    }

    override fun callApiForSavingAnswer(token: String, request: StudentAnswerRequest): Single<StudentAnswerResponse> {
        Log.d(TAG, "<< callApiForSavingAnswer()")
        Log.d(TAG, ">> callApiForSavingAnswer()")
        return api.addStudentResponse(token, request)
    }

    override fun callApiForUpdatingAnswer(token: String, request: StudentAnswerResponse): Single<StudentAnswerResponse> {
        Log.d(TAG, "<< callApiForUpdatingAnswer()")
        Log.d(TAG, ">> callApiForUpdatingAnswer()")
        return api.updateStudentResponse(token, request.id, request.studentAnswer)
    }

    override fun callApiForEndingExam(token: String, endRequest: EndExamRequest): Single<EndExamResponse> {
        Log.d(TAG, "<< callApiForEndingExam()")
        Log.d(TAG, ">> callApiForEndingExam()")
        return api.endExam(token, endRequest)
    }
}