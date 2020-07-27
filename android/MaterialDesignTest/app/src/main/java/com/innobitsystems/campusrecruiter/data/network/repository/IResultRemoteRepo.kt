package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.data.network.model.CollegeWiseResultResponse
import io.reactivex.Flowable
import io.reactivex.Single

interface IResultRemoteRepo {
    fun callApiForStudentResult(token: String, code: Int, roll: String, question_paper_id: String): Single<Result>
    fun callApiForStudentResultList(token: String, code: Int, question_paper_id: String): Flowable<List<CollegeWiseResultResponse>>
}