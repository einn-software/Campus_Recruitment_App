package com.testexample.materialdesigntest.data.network.repository

import android.util.Log
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import io.reactivex.Flowable
import io.reactivex.Single

class UserRemoteRepository: IUserRemoteRepository {

    private val TAG = "User Remote Repository"
    private val api: GetDataServices = GetDataServices.create()

    override fun authStudent(rollNo: Long, password: String): Single<String> {
        //Log.d(TAG, "requesting token")
        return api.authStudent(StudentLoginRequest(rollNo, password)).map { it ->
            it.token
        }
    }

    override fun getStudent(token: String): Flowable<Student> {
        Log.d(TAG, "fetch student data")
        return api.getStudent(token)
    }

    override fun getCollege(token: String): Flowable<College> {
        return api.getCollege(token)
    }

    override fun authCollege(email: String, password: String): Single<String> {
        return api.authCollege(email, password)
    }


}