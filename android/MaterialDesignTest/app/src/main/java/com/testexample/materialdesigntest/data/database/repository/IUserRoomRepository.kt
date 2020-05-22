package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable

interface IUserRoomRepository {

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        rollNo: Long,
        password: String
    ): Flowable<Student>

    fun saveUser(student:Student)

    fun deleteUser(student: Student)

    fun getCollege(
        email: String
    ): Flowable<College>

    fun saveCollege(college: College)

    fun deleteCollege(college: College)
}
