package com.testexample.materialdesigntest.data.database

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey


@Entity(tableName = "student_table")
data class Student(
    @NonNull @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "student_Id") val studentId: Long = 0,
    @ColumnInfo(name = "student_name") val studentName: String?,
    @ColumnInfo(name = "student_email") val studentEmail: String?,
    @ColumnInfo(name = "student_password") val studentPassword: String,
    @ColumnInfo(name = "student_phone") val studentPhone: Long,
    @ColumnInfo(name = "student_roll_no") val studentRollNo: Long,
    @ColumnInfo(name = "student_branch") val studentBranch: String,
    @ColumnInfo(name = "student_college") val studentCollege: String
)

