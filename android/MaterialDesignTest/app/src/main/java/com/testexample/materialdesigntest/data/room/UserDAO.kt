package com.testexample.materialdesigntest.data.room

import androidx.room.*
import com.testexample.materialdesigntest.data.database.User


@Dao
interface UserDAO {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUSer(user: User)

    @Delete
    fun deleteUser(vararg user: User)

    @Query("SELECT * FROM user_table WHERE uEmail LIKE :userEmail AND uPassword LIKE:password")
    fun getUserByEmailPassword(userEmail: String,  password: String): User

    @Query("SELECT uEmail FROM user_table WHERE uEmail LIKE :userEmail")
    fun getUserByEmail(userEmail: String): String
}