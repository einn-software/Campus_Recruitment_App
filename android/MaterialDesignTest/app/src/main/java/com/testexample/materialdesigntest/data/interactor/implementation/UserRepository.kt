package com.testexample.materialdesigntest.data.interactor.implementation

import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.data.database.repository.IUserRoomRepository
import com.testexample.materialdesigntest.data.database.repository.UserRoomRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.TPO
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.repository.IUserRemoteRepository
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import io.reactivex.Flowable
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

// makes a singleton, has a single instance running at a time
class UserRepository(context: Context) : IUserRepository {

    private val TAG = "UserRepository"
    private val remoteRepository: IUserRemoteRepository = UserRemoteRepository()

    private val roomRepository: IUserRoomRepository = UserRoomRepository(context)

    override fun isStudentValid(loginRequest: StudentLoginRequest): Single<AuthResponse> {
        Log.d(TAG, "<< isStudentValid()")
        Log.d(TAG, ">> isStudentValid()")
        return remoteRepository.authStudent(loginRequest)
    }

    override fun isExistingUser(userEmail: String): Boolean {
        TODO("Not yet implemented")
    }

    override fun saveStudent(token: String) {
        Log.d(TAG, "<< saveStudent")
        val student = remoteRepository.getStudent(UserRequest(token, ""))
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .handelNetworkError()
                .subscribe(
                        { student ->
                            roomRepository.saveUser(student!!)
                            Log.i(TAG, "get student data successfully")
                        },
                        { error -> Log.e(TAG, error.toString()) },
                        { Log.d(TAG, "getStudent query completed ") }
                )
        Log.d(TAG, ">> saveStudent")
    }

    override fun getStudent(userRequest: UserRequest): Flowable<Student> {
        Log.d(TAG, "<< getStudent()")
        Log.d(TAG, ">> getStudent()")
        return remoteRepository.getStudent(userRequest)
    }

    override fun forgotPasswordStudent(email: String): Single<String> {
        TODO("Not yet implemented")
    }

    override fun forgotPasswordTPO(email: String): Single<String> {
        TODO("Not yet implemented")
    }

    override fun isTPOValid(email: String, password: String): Single<AuthResponse> {
        Log.d(TAG, "<< isTPOValid()")
        Log.d(TAG, ">> isTPOValid()")
        return remoteRepository.authTPO(TpoLoginRequest(email, password))
    }

    override fun getTPO(userRequest: UserRequest): Flowable<TPO> {
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
