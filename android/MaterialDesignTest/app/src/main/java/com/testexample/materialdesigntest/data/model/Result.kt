package com.testexample.materialdesigntest.data.model

import android.os.Parcelable
import androidx.room.Entity
import kotlinx.android.parcel.Parcelize

@Entity(tableName = "student_result_table")
@Parcelize
data class Result(
    val name: String,
    val roll: String,
    val code: Int,
    val question_paper_id: String,
    val question_attempt: Int,
    val correct_attempt: Int,
    val total_marks_scored: Int,
    val total_question: Int,
    val total_marks: Int
) : Parcelable

data class ResultResponse(
    val name: String,
    val roll: String,
    val question_paper_id: String,
    val question_attempt: Int,
    val correct_attempt: Int,
    val total_marks_scored: Int
)


