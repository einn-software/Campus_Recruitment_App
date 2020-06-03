package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Completable
import io.reactivex.Flowable
import io.reactivex.Maybe


@Dao
interface StudentDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(student: Student): Maybe<Long>

    @Delete
    fun deleteUser(student: Student): Completable


    @Query("SELECT * FROM student_table")
    fun getAllUsers(): Flowable<List<Student>>

    @Query("SELECT * FROM student_table WHERE student_roll_no LIKE :rollNo AND student_password LIKE:password")
    fun getUserByRollNoPassword(rollNo: String, password: String): Flowable<Student>

    @Query("SELECT student_email FROM student_table WHERE student_email LIKE :userEmail")
    fun getUserByEmail(userEmail: String): String
}