package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.interactor.interfaces.IExaminationRepo
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.repository.ExaminationRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.IExaminationRemoteRepo
import io.reactivex.Single

class ExaminationRepo() : IExaminationRepo {

    private val remoteRepo: IExaminationRemoteRepo = ExaminationRemoteRepo()

    override fun loadQuestionPaperFromRemote(token: String,
                                             fetchExamRequest: FetchExamRequest)
            : Single<QuestionPaper> {
        return remoteRepo
            .callApiForQuestionPaper(token, fetchExamRequest)
    }

    override fun fetchQuestionFromRemote(token: String,
                                         questionId: String)
            : Single<Question> {
        return remoteRepo
                .callApiForQuestion(token, questionId)
    }

    override fun saveResponse(token: String, response: StudentAnswerRequest)
            : Single<StudentAnswerResponse> {
       return remoteRepo.callApiForSavingAnswer(token, response)
    }

    override fun updateResponse(token: String, response: StudentAnswerResponse)
            : Single<StudentAnswerResponse> {
        return remoteRepo.callApiForUpdatingAnswer(token, response)
    }

    override fun stopExam(token: String, endExamRequest: EndExamRequest): Single<EndExamResponse> {
        return remoteRepo.callApiForEndingExam(token, endExamRequest)
    }
}

