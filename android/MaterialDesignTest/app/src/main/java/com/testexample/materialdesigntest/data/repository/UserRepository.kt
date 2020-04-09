package com.testexample.materialdesigntest.data.repository

import com.testexample.materialdesigntest.data.database.model.Student
import com.testexample.materialdesigntest.data.interactor.IRoomRepository
import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.data.room.StudentDao
import io.reactivex.Flowable

// makes a singleton, has a single instance running at a time
class UserRepository(private val roomRepository: IRoomRepository)
    : IUserRepository {

    override fun isUserValid(userEmail: String,
                             password: String):
            Flowable<Boolean> {
        return roomRepository
            .isUserValid(userEmail, password)

    }

    override fun isExistingUser(userEmail: String): Boolean {
        return roomRepository.isExistingUser(userEmail)

    }

    override fun getUser(userEmail: String,
                         password: String):
            Flowable<Student> {
        return roomRepository
            .getUser(userEmail, password)
    }


}