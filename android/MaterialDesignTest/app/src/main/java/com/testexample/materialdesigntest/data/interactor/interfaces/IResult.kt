package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.model.FetchResultRequest
import io.reactivex.Single

interface IResult {
    fun getResult(token: String, fetchResultRequest: FetchResultRequest)
            : Single<Result>
}