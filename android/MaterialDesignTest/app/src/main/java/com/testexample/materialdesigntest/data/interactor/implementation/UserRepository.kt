package com.testexample.materialdesigntest.data.interactor.implementation

import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.data.database.repository.IUserRoomRepository
import com.testexample.materialdesigntest.data.database.repository.UserRoomRepository
import com.testexample.materialdesigntest.data.interactor.interfaces.IUserRepository
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.repository.IUserRemoteRepository
import com.testexample.materialdesigntest.data.network.repository.UserRemoteRepository
import io.reactivex.Flowable
import io.reactivex.Scheduler
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

// makes a singleton, has a single instance running at a time
class UserRepository(context: Context)
    : IUserRepository {

    private val TAG = "User Repository"
    private val remoteRepository:
            IUserRemoteRepository = UserRemoteRepository()

    private val roomRepository: IUserRoomRepository = UserRoomRepository(context)

    override fun isStudentValid(rollNo: Long, password: String): Single<String> {
        return remoteRepository.authStudent(rollNo, password)
    }

    override fun isExistingUser(userEmail: String): Boolean {
        TODO("Not yet implemented")
    }

    override fun saveStudent(token: String) {
        Log.d(TAG, "save Student")
        val student = remoteRepository.getStudent(token)
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(
                { student ->
                    Log.d(TAG, "user data saved")
                    roomRepository.saveUser(student!!)
                    println(student)
                },
                {error -> Log.d(TAG, error.toString())},
                { println("fetch query completed ")}
            )
    }

    override fun getStudent(): Flowable<Student> {
        TODO("Not yet implemented")
    }

    override fun isCollegeValid(email: String, password: String): Single<String> {
        return remoteRepository.authCollege(email, password)
    }

    override fun getCollege(token: String): Flowable<College> {
        return remoteRepository.getCollege(token)
    }

}