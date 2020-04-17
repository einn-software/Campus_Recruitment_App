package com.testexample.materialdesigntest.data.database.repository

import android.annotation.SuppressLint
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.database.room.StudentDao
import io.reactivex.Flowable

class UserRoomRepository(private val studentDao: StudentDao) :
    IUserRoomRepository {


    @SuppressLint("VisibleForTests")
    override fun isExistingUser(userEmail: String): Boolean {
        return userEmail == studentDao
            .getUserByEmail(userEmail)
    }

    @SuppressLint("VisibleForTests")
    override fun getUser(userEmail: String,
                         password: String):
            Flowable<Student> {
            return studentDao.getUserByEmailPassword(userEmail, password)

    }
}







