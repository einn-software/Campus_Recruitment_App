package com.testexample.materialdesigntest.data.interactor.implementation

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.IQuestionPaperRepo
import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import com.testexample.materialdesigntest.data.network.repository.IQuestionPaperRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.QuestionPaperRemoteRepo
import io.reactivex.Flowable

class QuestionPaperRepo: IQuestionPaperRepo {
    private val TAG = "QuestionPaperRepo"
    private val remoteRepo: IQuestionPaperRemoteRepo = QuestionPaperRemoteRepo()

    override fun getQuestionPaperList(token: String, code: Int): Flowable<List<QuestionPaperListResponse>> {
        Log.d(TAG,"<< getQuestionPaperList()")
        Log.d(TAG,">> getQuestionPaperList()")
        return remoteRepo.callApiForGetQuestionPaperList(token, code)
    }
}