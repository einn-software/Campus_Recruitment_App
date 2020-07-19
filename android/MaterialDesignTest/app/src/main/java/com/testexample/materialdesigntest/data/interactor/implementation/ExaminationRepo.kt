package com.testexample.materialdesigntest.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
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
        HyperLog.d(TAG, "<< loadQuestionPaperFromRemote()")
        HyperLog.d(TAG, ">> loadQuestionPaperFromRemote()")
        return remoteRepo.callApiForQuestionPaper(token, fetchExamRequest)
    }

    override fun fetchQuestionFromRemote(token: String, questionId: String): Single<Question> {
        HyperLog.d(TAG, "<< fetchQuestionFromRemote()")
        HyperLog.d(TAG, ">> fetchQuestionFromRemote()")
        return remoteRepo.callApiForQuestion(token, questionId)
    }

    override fun saveResponse(token: String, response: StudentAnswerRequest): Single<StudentAnswerResponsePlain> {
        HyperLog.d(TAG, "<< saveResponse(): state: ${response.state}")
        HyperLog.d(TAG, ">> saveResponse()")
        return remoteRepo.callApiForSavingAnswer(token, response)
    }

    override fun getAnswerList(token: String, request: EndExamRequest):
            Single<List<StudentAnswerResponsePlain>>{
        HyperLog.d(TAG, "<< getAnswerList()")
        HyperLog.d(TAG, ">> getAnswerList()")
        return remoteRepo.callApiForFetchingAnswerList(token, request)
    }

    override fun updateResponse(token: String, response: StudentAnswerResponse): Single<StudentAnswerResponsePlain> {
        HyperLog.d(TAG, "<< updateResponse()")
        HyperLog.d(TAG, ">> updateResponse()")
        return remoteRepo.callApiForUpdatingAnswer(token, response)
    }

    override fun stopExam(token: String, endExamRequest: EndExamRequest): Single<MessageResponse> {
        HyperLog.d(TAG, "<< stopExam()")
        HyperLog.d(TAG, ">> stopExam()")
        return remoteRepo.callApiForEndingExam(token, endExamRequest)
    }
}

