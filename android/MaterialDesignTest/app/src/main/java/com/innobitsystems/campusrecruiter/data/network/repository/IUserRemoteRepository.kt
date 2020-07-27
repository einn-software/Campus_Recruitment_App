package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.data.model.Student
import com.innobitsystems.campusrecruiter.data.model.TPO
import com.innobitsystems.campusrecruiter.data.network.model.*
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRemoteRepository {
    fun authStudent(loginRequest: StudentLoginRequest): Single<AuthResponse>
    fun getStudent(userRequest: UserRequest): Flowable<Student>
    fun getTPO(userRequest: UserRequest): Flowable<TPO>
    fun authTPO(loginRequest: TpoLoginRequest): Single<AuthResponse>
    fun callAPIForCollegeList(): Flowable<List<CollegeResponse>>
    fun callForgotPasswordApi(email: String, userType: String): Single<MessageResponse>
}