package com.testexample.materialdesigntest.data.database.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey


@Entity(tableName = "student_table")
data class Student(
    @NonNull @PrimaryKey
    @ColumnInfo(name = "student_Id") val studentId:String,
    @ColumnInfo(name = "student_name") val studentName: String?,
    @ColumnInfo(name = "student_email") val studentEmail: String?,
    @ColumnInfo(name = "student_password") val studentPassword: String,
    @ColumnInfo(name = "student_phone") val studentPhone: Long,
    @ColumnInfo(name = "student_roll_no") val studentRollNo: Long,
    @ColumnInfo(name = "student_branch") val studentBranch: String,
    @ColumnInfo(name = "student_college") val studentCollege: String
)

