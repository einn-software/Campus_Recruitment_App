package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.model.CollegeWiseResultResponse
import io.reactivex.Flowable
import io.reactivex.Single

interface IResultRemoteRepo {
    fun callApiForStudentResult(token: String, code: Int, roll: String, question_paper_id: String): Single<Result>
    fun callApiForStudentResultList(token: String, code: Int, question_paper_id: String): Flowable<List<CollegeWiseResultResponse>>
}