package com.testexample.materialdesigntest.data.network.repository

import android.annotation.SuppressLint
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable


class PreExamInstructionsRemoteRepo : IPreExamInstructionsRemoteRepo {

    private val TAG = "PreExamInstructionsRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    @SuppressLint("LongLogTag")
    override fun callInstructionsApi(token: String, id: String): Flowable<Instructions> {
        HyperLog.d(TAG, "<< callInstructionsApi()")
        HyperLog.d(TAG, ">> callInstructionsApi()")
        return api.getInstructions(token, id)
    }
}