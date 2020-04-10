package com.testexample.materialdesigntest.data.repository

import android.annotation.SuppressLint
import com.testexample.materialdesigntest.data.database.model.Student
import com.testexample.materialdesigntest.data.interactor.IRoomRepository
import com.testexample.materialdesigntest.data.room.StudentDao
import io.reactivex.Flowable

class RoomRepository(private val studentDao: StudentDao) : IRoomRepository{


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







