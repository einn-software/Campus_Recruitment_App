package com.testexample.materialdesigntest.data.interactor.implementation

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.repository.IUserRemoteRepository
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import io.reactivex.Flowable
import io.reactivex.Single

class UserRepository() : IUserRepository {

    private val TAG = "UserRepository"
    private val remoteRepository: IUserRemoteRepository = UserRemoteRepository()

    override fun isStudentValid(loginRequest: StudentLoginRequest): Single<AuthResponse> {
        Log.d(TAG, "<< isStudentValid()")
        Log.d(TAG, ">> isStudentValid()")
        return remoteRepository.authStudent(loginRequest)
    }

    override fun getStudent(userRequest: UserRequest): Flowable<Student> {
        Log.d(TAG, "<< getStudent()")
        Log.d(TAG, ">> getStudent()")
        return remoteRepository.getStudent(userRequest)
    }

    override fun forgotPassword(email: String, userTpe: String): Single<String> {
        Log.d(TAG, "<< forgotPassword()")
        Log.d(TAG, ">> forgotPassword()")
        return remoteRepository.callForgotPasswordApi(email, userTpe)
    }

    override fun isTpoValid(email: String, password: String): Single<AuthResponse> {
        Log.d(TAG, "<< isTPOValid()")
        Log.d(TAG, ">> isTPOValid()")
        return remoteRepository.authTPO(TpoLoginRequest(email, password))
    }

    override fun getTpo(userRequest: UserRequest): Flowable<TPO> {
        Log.d(TAG, "<< getTPO()")
        Log.d(TAG, ">> getTPO()")
        return remoteRepository.getTPO(userRequest)
    }

    override fun getCollegeList(): Flowable<List<CollegeResponse>> {
        Log.d(TAG, "<< getCollegeList()")
        Log.d(TAG, ">> getCollegeList()")
        return remoteRepository.callAPIForCollegeList()
    }

}
