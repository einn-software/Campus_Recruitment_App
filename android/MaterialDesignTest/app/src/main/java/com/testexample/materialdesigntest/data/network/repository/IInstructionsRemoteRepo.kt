package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.Flowable



interface IInstructionsRemoteRepo {
    fun callInstructionsApi(token:String, id: String):
            Flowable<Instructions>
}