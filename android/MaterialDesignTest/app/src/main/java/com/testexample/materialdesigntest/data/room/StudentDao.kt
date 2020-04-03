package com.testexample.materialdesigntest.data.room

import androidx.annotation.VisibleForTesting
import androidx.room.*
import com.testexample.materialdesigntest.data.database.Student
import io.reactivex.Completable
import io.reactivex.Flowable
import io.reactivex.Maybe


@Dao
@VisibleForTesting
interface StudentDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(student: Student): Maybe<Long>

    @Delete
    fun deleteUser(student: Student): Completable


    @Query("SELECT * FROM student_table")
    fun getAllUsers(): Flowable<List<Student>>

    @Query("SELECT * FROM student_table WHERE student_email LIKE :userEmail AND student_password LIKE:password")
    fun getUserByEmailPassword(userEmail: String,  password: String): Flowable<Student>

    @Query("SELECT student_email FROM student_table WHERE student_email LIKE :userEmail")
    fun getUserByEmail(userEmail: String): String
}