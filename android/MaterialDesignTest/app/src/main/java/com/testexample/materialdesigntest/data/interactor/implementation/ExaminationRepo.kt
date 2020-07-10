package com.testexample.materialdesigntest.data.interactor.implementation

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.repository.ExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IExaminationRemoteRepo
import io.reactivex.Single

class ExaminationRepo : IExaminationRepo {

    private val TAG = "ExaminationRepo"
    private val remoteRepo: IExaminationRemoteRepo = ExaminationRemoteRepo()

    override fun loadQuestionPaperFromRemote(token: String, fetchExamRequest: FetchExamRequest): Single<QuestionPaper> {
        Log.d(TAG, "<< loadQuestionPaperFromRemote()")
        Log.d(TAG, ">> loadQuestionPaperFromRemote()")
        return remoteRepo.callApiForQuestionPaper(token, fetchExamRequest)
    }

    override fun fetchQuestionFromRemote(token: String, questionId: String): Single<Question> {
        Log.d(TAG, "<< fetchQuestionFromRemote()")
        Log.d(TAG, ">> fetchQuestionFromRemote()")
        return remoteRepo.callApiForQuestion(token, questionId)
    }

    override fun saveResponse(token: String, response: StudentAnswerRequest): Single<StudentAnswerResponsePlain> {
        Log.d(TAG, "<< saveResponse(): state: ${response.state}")
        Log.d(TAG, ">> saveResponse()")
        return remoteRepo.callApiForSavingAnswer(token, response)
    }

    override fun getAnswerList(token: String, request: EndExamRequest):
            Single<List<StudentAnswerResponsePlain>>{
        Log.d(TAG, "<< getAnswerList()")
        Log.d(TAG, ">> getAnswerList()")
        return remoteRepo.callApiForFetchingAnswerList(token, request)
    }

    override fun updateResponse(token: String, response: StudentAnswerResponse): Single<StudentAnswerResponsePlain> {
        Log.d(TAG, "<< updateResponse()")
        Log.d(TAG, ">> updateResponse()")
        return remoteRepo.callApiForUpdatingAnswer(token, response)
    }

    override fun stopExam(token: String, endExamRequest: EndExamRequest): Single<EndExamResponse> {
        Log.d(TAG, "<< stopExam()")
        Log.d(TAG, ">> stopExam()")
        return remoteRepo.callApiForEndingExam(token, endExamRequest)
    }
}

