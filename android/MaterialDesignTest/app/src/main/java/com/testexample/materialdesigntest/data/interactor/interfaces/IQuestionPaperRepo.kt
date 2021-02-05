package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import io.reactivex.Flowable

interface IQuestionPaperRepo {
    fun getQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>>
}