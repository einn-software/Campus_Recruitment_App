package com.testexample.materialdesigntest.data.interactor

import com.testexample.materialdesigntest.data.database.model.Student
import io.reactivex.Flowable
import io.reactivex.Single

interface IRoomRepository {

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        userEmail: String,
        password: String
    ): Flowable<Student>
}
