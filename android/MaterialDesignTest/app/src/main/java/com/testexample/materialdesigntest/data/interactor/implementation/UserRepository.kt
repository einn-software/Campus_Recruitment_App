package com.testexample.materialdesigntest.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
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
        HyperLog.d(TAG, "<< isStudentValid()")
        HyperLog.d(TAG, ">> isStudentValid()")
        return remoteRepository.authStudent(loginRequest)
    }

    override fun getStudent(userRequest: UserRequest): Flowable<Student> {
        HyperLog.d(TAG, "<< getStudent()")
        HyperLog.d(TAG, ">> getStudent()")
        return remoteRepository.getStudent(userRequest)
    }

    override fun forgotPassword(email: String, userTpe: String): Single<String> {
        HyperLog.d(TAG, "<< forgotPassword()")
        HyperLog.d(TAG, ">> forgotPassword()")
        return remoteRepository.callForgotPasswordApi(email, userTpe)
    }

    override fun isTpoValid(email: String, password: String): Single<AuthResponse> {
        HyperLog.d(TAG, "<< isTPOValid()")
        HyperLog.d(TAG, ">> isTPOValid()")
        return remoteRepository.authTPO(TpoLoginRequest(email, password))
    }

    override fun getTpo(userRequest: UserRequest): Flowable<TPO> {
        HyperLog.d(TAG, "<< getTPO()")
        HyperLog.d(TAG, ">> getTPO()")
        return remoteRepository.getTPO(userRequest)
    }

    override fun getCollegeList(): Flowable<List<CollegeResponse>> {
        HyperLog.d(TAG, "<< getCollegeList()")
        HyperLog.d(TAG, ">> getCollegeList()")
        return remoteRepository.callAPIForCollegeList()
    }

}
