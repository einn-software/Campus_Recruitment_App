package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Flowable

interface IResultRoomRepo {
    fun addResult(result: Result)
    fun addResponse(response: Response)
    fun getResult(rollNo: String): Flowable<Result>
}