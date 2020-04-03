package com.testexample.materialdesigntest.data.model

import com.testexample.materialdesigntest.data.room.RoomRepository
import com.testexample.materialdesigntest.data.database.Student
import com.testexample.materialdesigntest.data.interactor.IUserRepository
import io.reactivex.Flowable

// makes a singleton, has a single instance running at a time
class UserRepository: IUserRepository {

    private val roomRepository = RoomRepository()
    override fun isUserValid(userEmail: String,
                             password: String):
            Boolean {
        val user =roomRepository
            .isUserValid(userEmail, password)
        return true
    }

    override fun isExistingUser(userEmail: String): Boolean {
        return true

    }

    override fun getUser(userEmail: String,
                         password: String):
            Flowable<Student> {
        val user = roomRepository
            .getUser(userEmail, password)
        return user
    }


}