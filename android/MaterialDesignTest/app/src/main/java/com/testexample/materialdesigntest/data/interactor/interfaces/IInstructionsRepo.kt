package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.Single


interface IInstructionsRepo {
    fun getInstructionsFromRemoteRepo(token:String, id: String):
            Single<Instructions>
}