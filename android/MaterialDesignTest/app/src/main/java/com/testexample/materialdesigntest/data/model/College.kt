package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "college_table")
data class College(
    @NonNull @PrimaryKey
    @ColumnInfo(name = "college_Id") val collegeId: String,
    @ColumnInfo(name = "college_name") val collegeName: String?,
    @ColumnInfo(name = "college_email") val collegeEmail: String?,
    @ColumnInfo(name = "college_password") val collegePassword: String,
    @ColumnInfo(name = "college_phone") val collegePhone: Long,
    @ColumnInfo(name = "code") val collegeCode: Long,
    @ColumnInfo(name = "college_address") val collegeAddress: String
)