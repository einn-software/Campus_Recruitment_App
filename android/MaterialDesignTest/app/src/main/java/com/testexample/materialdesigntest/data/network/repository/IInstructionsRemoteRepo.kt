package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.Flowable
import java.util.*


interface IInstructionsRemoteRepo {
    fun callInstructionsApi(code: String, date: Date):
            Flowable<Instructions>
}