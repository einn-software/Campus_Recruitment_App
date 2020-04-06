package com.testexample.materialdesigntest.data.repository

import com.testexample.materialdesigntest.data.database.model.Student
import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.data.room.StudentDao
import io.reactivex.Flowable

// makes a singleton, has a single instance running at a time
class UserRepository: IUserRepository {
    private lateinit var studentDao: StudentDao

    private val roomRepository =
        RoomRepository(studentDao)
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