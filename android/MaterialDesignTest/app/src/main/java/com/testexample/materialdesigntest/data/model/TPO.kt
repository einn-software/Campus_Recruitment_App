package com.testexample.materialdesigntest.data.model

import androidx.room.ColumnInfo
import com.google.gson.annotations.SerializedName

data class TPO(
    @SerializedName("_id") @ColumnInfo(name = "_id") val TPOId: String,
    @SerializedName("name") @ColumnInfo(name = "name") val TPOName: String?,
    @SerializedName("email") @ColumnInfo(name = "email") val TPOEmail: String?,
    @SerializedName("password") @ColumnInfo(name = "password") val TPOPassword: String,
    @SerializedName("phone") @ColumnInfo(name = "phone") val TPOPhone: String,
    @SerializedName("code") @ColumnInfo(name = "code") val TPOCollegeCode: Long,
    @SerializedName("college") @ColumnInfo(name = "college") val TPOCollegeName: String,
    @SerializedName("designation") @ColumnInfo(name = "designation") val TPODesignation: String
)