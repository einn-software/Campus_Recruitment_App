package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.data.network.model.FetchResultRequest
import io.reactivex.Single

interface IResult {
    fun getResult(token: String, fetchResultRequest: FetchResultRequest)
            : Single<Result>
}