package com.testexample.materialdesigntest.data.model

import android.os.Parcelable
import androidx.room.Entity
import kotlinx.android.parcel.Parcelize

@Entity(tableName = "student_result_table")
@Parcelize
data class Result(
    val studentId: String,
    val questionPaperId: String,
    val studentName: String,
    val studentRollNo: String,
    val noOfQuestionsAttempted: Int,
    val noOfQuestionsCorrect: Int,
    val totalNoOfQuestions: Int,
    val totalMarks: Int,
    val scoredMarks: Double
) : Parcelable



