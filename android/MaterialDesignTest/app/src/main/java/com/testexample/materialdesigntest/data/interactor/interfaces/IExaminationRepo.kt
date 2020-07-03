package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.*
import io.reactivex.Single

interface IExaminationRepo {
    fun fetchQuestionFromRemote(token: String, questionId: String)
            : Single<Question>
    fun loadQuestionPaperFromRemote(token: String, fetchExamRequest: FetchExamRequest)
            : Single<QuestionPaper>
    fun saveResponse(token: String, response: StudentAnswerRequest)
            : Single<StudentAnswerResponsePlain>
    fun updateResponse(token: String, response: StudentAnswerResponse)
            : Single<StudentAnswerResponsePlain>
    fun stopExam(token: String, endExamRequest: EndExamRequest): Single<EndExamResponse>

    fun getAnswerList(token: String, request: EndExamRequest):
            Single<List<StudentAnswerResponsePlain>>

}