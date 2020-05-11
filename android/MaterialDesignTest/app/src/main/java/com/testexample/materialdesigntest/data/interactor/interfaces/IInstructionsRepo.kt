package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.Flowable
import java.util.*


interface IInstructionsRepo {
    fun getInstructionsFromRemoteRepo(code: String, date: Date):
            Flowable<Instructions>
}