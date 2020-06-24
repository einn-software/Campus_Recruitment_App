package com.testexample.materialdesigntest.data.model

import android.os.Parcelable
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Entity(tableName = "college_table")
@Parcelize
data class College(
        @PrimaryKey
        @SerializedName("_id")val id: String,
        val name: String,
        val code: String?,
        val address: String,
        val university: String,
        val email: String,
        val phone: String
): Parcelable