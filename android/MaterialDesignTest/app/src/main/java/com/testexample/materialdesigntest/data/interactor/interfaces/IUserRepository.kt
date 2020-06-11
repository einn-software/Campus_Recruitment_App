package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRepository {

    fun isStudentValid(
        rollNo: Long,
        password: String
    ): Single<AuthResponse>

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
    ): Single<AuthResponse>

    fun getCollege(
        token: String
    ): Flowable<TPO>

    fun getCollegeList():
            Flowable<List<CollegeResponse>>

}




