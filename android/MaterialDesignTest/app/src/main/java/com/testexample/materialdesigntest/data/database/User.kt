package com.testexample.materialdesigntest.data.database

import androidx.room.Entity


@Entity(tableName = "user_table")
data class User(
    val uId: Int,
    val uName: String,
    val uEmail: String,
    val uPassword: String,
    val uPhone : Int
)

