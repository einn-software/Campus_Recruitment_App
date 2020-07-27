package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.Instructions
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.network.model.FetchExamRequest
import io.reactivex.Flowable
import io.reactivex.Single


interface IPreExamInstructionsRepo {
    fun getInstructionsFromRemoteRepo(token:String, id: String):
            Flowable<Instructions>
    fun getExamInfoFromRemoteRepo(token: String, request: FetchExamRequest):
            Single<QuestionPaper>
}