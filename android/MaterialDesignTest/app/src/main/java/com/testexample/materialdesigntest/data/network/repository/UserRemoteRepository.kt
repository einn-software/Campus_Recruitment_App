package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.ApiClient
import io.reactivex.Flowable

class UserRemoteRepository: ApiClient(), IUserRemoteRepository {

    override fun getStudent(rollNo: Long, password: String):
            Flowable<Student> {
        return myAppServices.getStudent()
        }

    override fun getCollege(email:String, password: String):
            Flowable<College> {
        TODO("Not yet implemented")
    }
}