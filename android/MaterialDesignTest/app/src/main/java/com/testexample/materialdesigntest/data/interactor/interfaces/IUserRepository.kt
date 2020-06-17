package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRepository {

    fun isStudentValid(loginRequest: StudentLoginRequest
    ): Single<AuthResponse>

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun saveStudent(
        token: String
    )

    fun getStudent(userRequest: UserRequest): Flowable<Student>

    fun forgotPasswordStudent(email: String):Single<String>

    fun forgotPasswordTPO(email: String):Single<String>
  
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




