package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import io.reactivex.Flowable

interface IQuestionPaperRemoteRepo {
    fun callApiForGetQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>>

}