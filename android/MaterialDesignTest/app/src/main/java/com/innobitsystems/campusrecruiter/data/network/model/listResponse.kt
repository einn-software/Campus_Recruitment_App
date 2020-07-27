package com.innobitsystems.campusrecruiter.data.network.model

import com.google.gson.annotations.SerializedName

data class CollegeResponse(
    @SerializedName("_id") val collegeId: String,
    @SerializedName("name") val collegeName: String?,
    @SerializedName("code") val collegeCode: Int,
    @SerializedName("address") val collegeAddress: String,
    @SerializedName("university") val collegeUniversity: String
)

data class StudentResponse(
    @SerializedName("_id") val studentId: String,
    @SerializedName("name") val studentName: String?,
    @SerializedName("email") val studentEmail: String,
    @SerializedName("roll") val studentRollNo: String,
    @SerializedName("branch") val studentBranch: String
)

data class CollegeWiseResultResponse(
    @SerializedName("student_id") val studentId: String,
    @SerializedName("roll") val studentRollNo: String,
    @SerializedName("name") val studentName: String?,
    @SerializedName("question_attempt") val questionAttended: Int,
    @SerializedName("correct_attempt") val correctAttempted: Int,
    @SerializedName("total_marks_scored") val totalMarksScored: Double
)

data class QuestionPaperListResponse(
        @SerializedName("_id") val questionPaperId: String,
        @SerializedName("year") val year: Int,
        @SerializedName("month") val month: Int,
        @SerializedName("day") val day: Int,
        @SerializedName("paper_name") val paper_name: String
)

