package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.Question
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.network.model.*
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
    fun stopExam(token: String, endExamRequest: EndExamRequest): Single<MessageResponse>

    fun getAnswerList(token: String, request: EndExamRequest):
            Single<List<StudentAnswerResponsePlain>>

}