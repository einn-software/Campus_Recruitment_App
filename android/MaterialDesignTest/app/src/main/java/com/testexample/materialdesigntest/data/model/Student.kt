package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Ignore
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName


@Entity(tableName = "student_table")
data class Student(
    @NonNull @PrimaryKey
    @SerializedName("_id")@ColumnInfo(name = "student_Id") val studentId:String,
    @SerializedName("name")@ColumnInfo(name = "student_name") val studentName: String?,
    @SerializedName("email")@ColumnInfo(name = "student_email") val studentEmail: String?,
    @SerializedName("password")@ColumnInfo(name = "student_password") val studentPassword: String,
    @SerializedName("phone")@ColumnInfo(name = "student_phone") val studentPhone: Long,
    @SerializedName("roll")@ColumnInfo(name = "student_roll_no") val studentRollNo: Long,
    @SerializedName("branch")@ColumnInfo(name = "student_branch") val studentBranch: String,
    @SerializedName("college")@ColumnInfo(name = "student_college") val studentCollege: String,
    @SerializedName("college_code")@ColumnInfo(name = "student_college_code") val studentCollegeCode: String,
    @SerializedName("_v")  val version: Int
)

