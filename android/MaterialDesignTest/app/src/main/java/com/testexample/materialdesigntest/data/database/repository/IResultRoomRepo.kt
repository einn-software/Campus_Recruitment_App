package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Flowable

interface IResultRoomRepo {
    fun getResult(): Flowable<Result>
}