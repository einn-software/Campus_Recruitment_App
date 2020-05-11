package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRepository {

    fun isStudentValid(
        rollNo: Long,
        password: String
    ): Single<String>

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun saveStudent(
        token: String
    )

    fun getStudent(): Flowable<Student>

    fun isCollegeValid(
        email: String,
        password: String
    ): Single<String>

    fun getCollege(
        token: String
    ): Flowable<College>

}




