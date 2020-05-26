package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Single

interface IResultRemoteRepo {
    fun callApiForResultWithQuesId(token: String, code: Int, question_paper_id: String): Single<List<Result>>
    fun callApiForResultWithStudentId(token: String, code: Int, student_id: String): Single<Result>
    fun saveResult(result: Result)
}