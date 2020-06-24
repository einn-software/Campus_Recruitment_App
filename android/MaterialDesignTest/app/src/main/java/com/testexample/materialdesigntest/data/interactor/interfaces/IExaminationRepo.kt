package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.*
import io.reactivex.Completable
import io.reactivex.Single

interface IExaminationRepo {
    fun fetchQuestionFromRemote(token: String, questionId: String)
            : Single<Question>
    fun loadQuestionPaperFromRemote(token: String, fetchExamRequest: FetchExamRequest)
            : Single<QuestionPaper>
    fun saveResponse(token: String, response: StudentAnswerRequest)
            : Single<StudentAnswerResponse>
    fun updateResponse(token: String, response: StudentAnswerResponse)
            : Single<StudentAnswerResponse>
    fun stopExam(token: String, endExamRequest: EndExamRequest): Single<EndExamResponse>

}