package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import io.reactivex.Flowable
import io.reactivex.Single


interface IPreExamInstructionsRepo {
    fun getInstructionsFromRemoteRepo(token:String, id: String):
            Flowable<Instructions>
    fun getExamInfoFromRemoteRepo(token: String, request: FetchExamRequest):
            Single<QuestionPaper>
}