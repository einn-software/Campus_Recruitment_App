package com.innobitsystems.campusrecruiter.data.model

import android.os.Parcelable
import androidx.room.Entity
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Entity(tableName = "student_result_table")
@Parcelize
data class Result(
        @SerializedName("student_id") val studentId: String,
        @SerializedName("question_paper_id") val questionPaperId: String,
        @SerializedName("name") val studentName: String,
        @SerializedName("roll") val studentRollNo: String,
        @SerializedName("question_attempt") val noOfQuestionsAttempted: Int,
        @SerializedName("correct_attempt") val noOfQuestionsCorrect: Int,
        @SerializedName("total_number_of_questions") val totalNoOfQuestions: Int,
        @SerializedName("total_marks") val totalMarks: Int,
        @SerializedName("total_marks_scored") val scoredMarks: Double
) : Parcelable


