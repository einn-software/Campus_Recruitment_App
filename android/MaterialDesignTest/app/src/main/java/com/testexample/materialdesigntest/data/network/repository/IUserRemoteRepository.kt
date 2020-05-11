package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable
import io.reactivex.Single

interface IUserRemoteRepository {
    fun authStudent(rollNo: Long, password: String): Single<String>
    fun getStudent(token: String): Flowable<Student>
    fun getCollege(token: String): Flowable<College>
    fun authCollege(email: String, password: String): Single<String>
}