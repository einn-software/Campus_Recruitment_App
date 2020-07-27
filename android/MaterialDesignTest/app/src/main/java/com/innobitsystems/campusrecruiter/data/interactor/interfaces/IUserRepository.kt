package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.Student
import com.innobitsystems.campusrecruiter.data.model.TPO
import com.innobitsystems.campusrecruiter.data.network.model.*
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




