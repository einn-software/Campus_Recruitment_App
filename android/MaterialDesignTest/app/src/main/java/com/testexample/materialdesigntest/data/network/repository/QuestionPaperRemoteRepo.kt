package com.testexample.materialdesigntest.data.network.repository

import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable

class QuestionPaperRemoteRepo: IQuestionPaperRemoteRepo{
    val TAG = "QuestionPaperRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForGetQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>> {
        HyperLog.d(TAG,"<< callApiForGetQuestionPaperList()")
        HyperLog.d(TAG,">> callApiForGetQuestionPaperList()")
        return api.getQuestionPaperList(token,code)
    }

}