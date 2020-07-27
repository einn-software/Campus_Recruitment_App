package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.network.model.QuestionPaperListResponse
import io.reactivex.Flowable

interface IQuestionPaperRepo {
    fun getQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>>
}