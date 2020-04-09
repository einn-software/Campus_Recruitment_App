package com.testexample.materialdesigntest.data.interactor

import com.testexample.materialdesigntest.data.database.model.Student
import io.reactivex.Flowable
import org.intellij.lang.annotations.Flow

interface IUserRepository {

    fun isUserValid(
        userEmail: String,
        password: String
    ): Flowable<Boolean>

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        userEmail: String,
        password: String
    ): Flowable<Student>
}



