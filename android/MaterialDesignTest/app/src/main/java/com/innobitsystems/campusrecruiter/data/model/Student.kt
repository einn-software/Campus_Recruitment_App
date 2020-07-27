package com.innobitsystems.campusrecruiter.data.model

import android.os.Parcelable
import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize


@Entity(tableName = "student_table")
@Parcelize
data class Student(
    @NonNull @PrimaryKey
    @SerializedName("_id")@ColumnInfo(name = "student_Id") val studentId:String = "",
    @SerializedName("name")@ColumnInfo(name = "student_name") val studentName: String? = "",
    @SerializedName("email")@ColumnInfo(name = "student_email") val studentEmail: String? = "",
    @SerializedName("password")@ColumnInfo(name = "student_password") val studentPassword: String = "",
    @SerializedName("phone")@ColumnInfo(name = "student_phone") val studentPhone: Long = 0,
    @SerializedName("roll")@ColumnInfo(name = "student_roll_no") val studentRollNo: String = "",
    @SerializedName("branch")@ColumnInfo(name = "student_branch") val studentBranch: String = "",
    @SerializedName("college")@ColumnInfo(name = "student_college") val studentCollege: String = "",
    @SerializedName("code")@ColumnInfo(name = "student_college_code") val studentCollegeCode: Int = 0
) : Parcelable


