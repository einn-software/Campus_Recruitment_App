package com.innobitsystems.campusrecruiter.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IUserRepository
import com.innobitsystems.campusrecruiter.data.model.Student
import com.innobitsystems.campusrecruiter.data.model.TPO
import com.innobitsystems.campusrecruiter.data.network.model.*
import com.innobitsystems.campusrecruiter.data.network.repository.IUserRemoteRepository
import com.innobitsystems.campusrecruiter.data.network.repository.UserRemoteRepository
import io.reactivex.Flowable
import io.reactivex.Single

class UserRepository : IUserRepository {

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

    override fun forgotPassword(email: String, userTpe: String): Single<MessageResponse> {
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
