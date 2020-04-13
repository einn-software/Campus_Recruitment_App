package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable

interface IRoomRepository {

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        userEmail: String,
        password: String
    ): Flowable<Student>
}
