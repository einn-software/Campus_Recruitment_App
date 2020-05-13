package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.interactor.interfaces.IInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.repository.IInstructionsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.InstructionsRemoteRepo
import io.reactivex.Flowable



class InstructionsRepo:
    IInstructionsRepo {

    private val remote : IInstructionsRemoteRepo = InstructionsRemoteRepo()
    override fun getInstructionsFromRemoteRepo(
        token:String,
        code: String,
        date: String
    ): Flowable<Instructions> {
        return remote.callInstructionsApi(token, code, date)
    }
}