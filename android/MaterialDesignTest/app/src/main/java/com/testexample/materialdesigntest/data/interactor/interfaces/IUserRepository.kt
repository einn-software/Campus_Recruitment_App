package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.*
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRepository {

    fun isStudentValid(loginRequest: StudentLoginRequest
    ): Single<AuthResponse>

    fun getStudent(userRequest: UserRequest)
            : Flowable<Student>

    fun forgotPassword(email: String, userTpe: String)
            : Single<MessageResponse>
  
    fun isTpoValid(
        email: String,
        password: String
    ): Single<AuthResponse>

    fun getTpo(
        userRequest: UserRequest
    ): Flowable<TPO>

    fun getCollegeList():
            Flowable<List<CollegeResponse>>

}




