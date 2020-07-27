package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.data.network.model.QuestionPaperListResponse
import io.reactivex.Flowable

interface IQuestionPaperRemoteRepo {
    fun callApiForGetQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>>

}