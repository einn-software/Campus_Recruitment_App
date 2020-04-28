package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable

interface IUserRemoteRepository {
    fun getStudent(rollNo: Long, password: String): Flowable<Student>
    fun loginRequest()
    fun getCollege(email: String, password: String): Flowable<College>
}