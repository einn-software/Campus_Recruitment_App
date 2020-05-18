package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single

class ResultRemoteRepo: IResultRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForResult(token: String, rollNo: Long): Single<Result> {
        return api.getResult(token, rollNo)
    }

    override fun saveResult(result: Result) {
        TODO("Not yet implemented")
    }
}