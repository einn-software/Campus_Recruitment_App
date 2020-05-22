package com.testexample.materialdesigntest.data.database.room

import androidx.annotation.VisibleForTesting
import androidx.room.*
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Completable
import io.reactivex.Flowable
import io.reactivex.Maybe

@Dao
@VisibleForTesting
interface CollegeDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUser(college: College): Maybe<Long>

    @Delete
    fun deleteUser(college: College): Completable


    @Query("SELECT * FROM college_table")
    fun getAllUsers(): Flowable<List<College>>

    @Query("SELECT * FROM college_table WHERE college_email LIKE :userEmail")
    fun getUserByEmailPassword(userEmail: String): Flowable<College>

}