package com.testexample.materialdesigntest.data.network.repository

import com.hypertrack.hyperlog.HyperLog
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
        HyperLog.d(TAG, "<< authStudent()")
        HyperLog.d(TAG, ">> authStudent()")
        return api.authStudent(loginRequest)
    }

    override fun getStudent(userRequest: UserRequest): Flowable<Student> {
        HyperLog.d(TAG, "<< getStudent()")
        HyperLog.d(TAG, ">> getStudent()")
        return api.getStudent(userRequest.token, userRequest.id)
    }

    override fun getTPO(userRequest: UserRequest): Flowable<TPO> {
        HyperLog.d(TAG, "<< getTPO()")
        HyperLog.d(TAG, ">> getTPO()")
        return api.getTPO(userRequest.token, userRequest.id)
    }

    override fun authTPO(loginRequest: TpoLoginRequest): Single<AuthResponse> {
        HyperLog.d(TAG, "<< authTPO()")
        HyperLog.d(TAG, ">> authTPO()")
        return api.authTPO(loginRequest)
    }

    override fun callAPIForCollegeList(): Flowable<List<CollegeResponse>> {
        HyperLog.d(TAG, "<< callAPIForCollegeList()")
        HyperLog.d(TAG, ">> callAPIForCollegeList()")
        return api.getCollegeList()
    }

    override fun callForgotPasswordApi(email: String, userType: String): Single<String> {
        var request : Single<String> = Single.just("")
        when (userType) {
            "student" -> {
                request = api.studentForgotPassword(email)
            }
            "tpo" -> {
                request = api.tpoForgotPassword(email)
            }
        }
        return request
    }
}