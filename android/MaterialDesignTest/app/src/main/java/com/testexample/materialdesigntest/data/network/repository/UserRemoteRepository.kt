package com.testexample.materialdesigntest.data.network.repository

import android.util.Log
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable
import io.reactivex.Single


class UserRemoteRepository : IUserRemoteRepository {

    private val TAG = "UserRemoteRepository"
    private val api: GetDataServices = GetDataServices.create()

    override fun authStudent(loginRequest: StudentLoginRequest): Single<AuthResponse> {
        Log.d(TAG, "<< authStudent()")
        Log.d(TAG, ">> authStudent()")
        return api.authStudent(loginRequest)
    }

    override fun getStudent(userRequest: UserRequest): Flowable<Student> {
        Log.d(TAG, "<< getStudent()")
        Log.d(TAG, ">> getStudent()")
        return api.getStudent(userRequest.token, userRequest.id)
    }

    override fun getTPO(userRequest: UserRequest): Flowable<TPO> {
        Log.d(TAG, "<< getTPO()")
        Log.d(TAG, ">> getTPO()")
        return api.getTPO(userRequest.token, userRequest.id)
    }

    override fun authTPO(loginRequest: TpoLoginRequest): Single<AuthResponse> {
        Log.d(TAG, "<< authTPO()")
        Log.d(TAG, ">> authTPO()")
        return api.authTPO(loginRequest)
    }

    override fun callAPIForCollegeList(): Flowable<List<CollegeResponse>> {
        Log.d(TAG, "<< callAPIForCollegeList()")
        Log.d(TAG, ">> callAPIForCollegeList()")
        return api.getCollegeList()
    }


}