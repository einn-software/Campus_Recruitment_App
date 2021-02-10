package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.AnswerResponse
import io.reactivex.Completable
import io.reactivex.Single

interface IExaminationRoomRepo {
    fun saveAnswerResponse(answerResponse: AnswerResponse):Completable
    fun updateAnswerResponse(answerResponse: AnswerResponse):Completable
    fun deleteAnswerResponse(answerResponseList: List<AnswerResponse>):Completable
    fun getAnswerResponse(): Single<List<AnswerResponse>>
    fun getAnswerResponseById(questionId: String): Single<AnswerResponse>
}