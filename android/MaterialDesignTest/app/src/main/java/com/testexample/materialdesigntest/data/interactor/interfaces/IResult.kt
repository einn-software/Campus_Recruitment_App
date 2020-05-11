package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Flowable

interface IResult {
    fun addResult(result: Result)
    fun addResponse(response: Response)
    fun getResult(rollNo: String):Flowable<Result>
}