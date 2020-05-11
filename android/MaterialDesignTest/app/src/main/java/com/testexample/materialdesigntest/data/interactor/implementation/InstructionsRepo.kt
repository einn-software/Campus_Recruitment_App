package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.interactor.interfaces.IInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.repository.IInstructionsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.InstructionsRemoteRepo
import io.reactivex.Flowable
import java.util.*


class InstructionsRepo:
    IInstructionsRepo {

    private val remote : IInstructionsRemoteRepo = InstructionsRemoteRepo()
    override fun getInstructionsFromRemoteRepo(
        code: String,
        date: Date
    ): Flowable<Instructions> {
        return remote.callInstructionsApi(code, date)
    }
}