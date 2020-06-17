package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable
import io.reactivex.Single


class UserRemoteRepository: IUserRemoteRepository {

    private val TAG = "User Remote Repository"
    private val api: GetDataServices = GetDataServices.create()

    override fun authStudent(loginRequest: StudentLoginRequest)
            : Single<AuthResponse> {
        return api.authStudent(loginRequest)
    }

    override fun getStudent(userRequest: UserRequest)
            : Flowable<Student> {
        return api.getStudent(userRequest.token, userRequest.id)
    }

    override fun getTPO(userRequest: UserRequest):
            Flowable<TPO> {
        return api.getTPO(userRequest.token, userRequest.id)
    }

    override fun authTPO(loginRequest: TpoLoginRequest): Single<AuthResponse> {
        return api.authTPO(loginRequest)
    }

    override fun callAPIForCollegeList(): Flowable<List<CollegeResponse>> {
        return api.getCollegeList()
    }


}