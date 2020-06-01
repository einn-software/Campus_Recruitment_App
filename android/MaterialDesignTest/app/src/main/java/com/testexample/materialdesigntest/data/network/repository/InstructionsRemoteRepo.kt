package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable


class InstructionsRemoteRepo: IInstructionsRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()

    override fun callInstructionsApi(token: String, code: String, date: String):
            Flowable<Instructions> {
        return api.getInstructions(token, code)
    }
}