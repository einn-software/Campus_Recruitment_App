package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.GetDataServices
import com.testexample.materialdesigntest.data.network.model.ExamRequest
import io.reactivex.Flowable
import java.util.*

class InstructionsRemoteRepo: IInstructionsRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()

    override fun callInstructionsApi(code: String, date: Date):
            Flowable<Instructions> {
        return api.getInstructions(ExamRequest(code, date))
    }
}