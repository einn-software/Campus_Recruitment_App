package com.innobitsystems.campusrecruiter.data.network.model

import androidx.room.Embedded
import com.google.gson.annotations.SerializedName

data class TPOUpdateRequest(
    @SerializedName("name")val TPOName: String,
    @SerializedName("email")val TPOEmail: String,
    @SerializedName("password")val TPOPassword: String,
    @SerializedName("phone")val TPOPhone: String,
    @SerializedName("designation")val TPODesignation: String,
    @SerializedName("college")val TPOCollege: String,
    @SerializedName("code")val TPOCode: Long
)

data class StudentAnswerRequest(
        @SerializedName("student_id")val studentId: String,
        @SerializedName("question_id")val questionId: String,
        @SerializedName("selected_option")val selectedOption: Int = 0,
        @SerializedName("question_paper_id")val questionPaperId: String,
        @SerializedName("state")val state: Int,
        @SerializedName("question_max_marks") val questionMaxMarks: Int
)

data class StudentAnswerResponsePlain(
        @SerializedName("_id") var id: String = "",
        @SerializedName("student_id")val studentId: String,
        @SerializedName("question_id")val questionId: String,
        @SerializedName("selected_option")val selectedOption: Int = 0,
        @SerializedName("question_paper_id")val questionPaperId: String,
        @SerializedName("state")val state: Int,
        @SerializedName("question_max_marks") val questionMaxMarks: Int
)

data class StudentAnswerResponse(
    @SerializedName("_id") var id: String = "",
    @Embedded val studentAnswer: StudentAnswerRequest
)

data class UpdateCollegeDetails(
        @SerializedName("name") val name: String,
        @SerializedName("address") val address: String,
        @SerializedName("university") val university: String,
        @SerializedName("email") val email: String,
        @SerializedName("phone") val phone: String
)