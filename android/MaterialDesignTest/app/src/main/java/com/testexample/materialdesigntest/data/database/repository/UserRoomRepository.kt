package com.testexample.materialdesigntest.data.database.repository

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.database.room.StudentDao
import com.testexample.materialdesigntest.data.model.College
import io.reactivex.Flowable
import io.reactivex.Scheduler
import io.reactivex.schedulers.Schedulers

class UserRoomRepository(context: Context) :
    IUserRoomRepository {

    private val studentDao: StudentDao =
        ApplicationDatabase.getInstance(context).studentDAO()

    @SuppressLint("VisibleForTests")
    override fun isExistingUser(userEmail: String): Boolean {
        return userEmail == studentDao
            .getUserByEmail(userEmail)
    }

    @SuppressLint("VisibleForTests")
    override fun getUser(rollNo: Long,
                         password: String):
            Flowable<Student> {
            return studentDao.getUserByRollNoPassword(rollNo, password)
    }

    override fun saveUser(student: Student) {
        studentDao.insertUser(student)
    }

    override fun deleteUser(student: Student) {
        studentDao.deleteUser(student)
    }

    override fun getCollege(email: String): Flowable<College> {
        TODO("Not yet implemented")
    }

    override fun saveCollege(college: College) {
        TODO("Not yet implemented")
    }

    override fun deleteCollege(college: College) {
        TODO("Not yet implemented")
    }
}







