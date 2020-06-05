package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.Flowable



interface IInstructionsRepo {
    fun getInstructionsFromRemoteRepo(token:String, id: String):
            Flowable<Instructions>
}