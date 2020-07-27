package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.data.network.model.CollegeWiseResultResponse
import io.reactivex.Flowable
import io.reactivex.Single

interface IResultRepo {
    fun getStudentResultFromRemoteRepo(token: String, code: Int, roll: String, question_paper_id: String):
            Single<Result>

    fun getStudentResultListFromRemoteRepo(token: String, code: Int, question_paper_id: String):
            Flowable<List<CollegeWiseResultResponse>>
}