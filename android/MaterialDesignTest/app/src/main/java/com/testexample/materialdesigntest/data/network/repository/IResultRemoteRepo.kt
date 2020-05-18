package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Single

interface IResultRemoteRepo {
    fun callApiForResult(token: String, rollNo: Long): Single<Result>
    fun saveResult(result: Result)
}