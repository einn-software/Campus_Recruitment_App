package com.testexample.materialdesigntest.data.room

import android.annotation.SuppressLint
import com.testexample.materialdesigntest.data.database.Student
import com.testexample.materialdesigntest.data.interactor.IRoomRepository
import io.reactivex.Flowable

class RoomRepository() : IRoomRepository{

    private lateinit var studentDao: StudentDao

    @SuppressLint("VisibleForTests")
    override fun isUserValid(userEmail: String,
                             password: String):
            Flowable<Student> {
        return studentDao
            .getUserByEmailPassword(userEmail, password)
    }

    @SuppressLint("VisibleForTests")
    override fun isExistingUser(userEmail: String): Boolean {
        return userEmail == studentDao
            .getUserByEmail(userEmail)
    }

    @SuppressLint("VisibleForTests")
    override fun getUser(userEmail: String,
                         password: String):
            Flowable<Student> {
        return  studentDao
            .getUserByEmailPassword(userEmail, password)
    }
}






