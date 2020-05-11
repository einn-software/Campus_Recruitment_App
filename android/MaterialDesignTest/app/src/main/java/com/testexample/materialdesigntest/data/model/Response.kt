package com.testexample.materialdesigntest.data.model

import android.os.Parcelable
import androidx.room.Entity
import kotlinx.android.parcel.Parcelize

@Entity(tableName = "student_response_table")
@Parcelize
data class Response(
    val questionNo: Int,
    val questionId: String,
    val isResponseCorrect: Boolean,
    val marksRewarded: Int
) : Parcelable