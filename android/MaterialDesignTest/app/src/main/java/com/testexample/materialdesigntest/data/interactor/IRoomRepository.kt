package com.testexample.materialdesigntest.data.interactor

import com.testexample.materialdesigntest.data.database.Student
import io.reactivex.Flowable

interface IRoomRepository {
    fun isUserValid(
        userEmail: String,
        password: String
    ): Flowable<Student>

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        userEmail: String,
        password: String
    ): Flowable<Student>
}
