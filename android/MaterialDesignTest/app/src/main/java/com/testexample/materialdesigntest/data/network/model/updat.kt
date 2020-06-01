package com.testexample.materialdesigntest.data.network.model

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
    @SerializedName("selected_option")val selectedOption: Int,
    @SerializedName("question_paper_id")val questionPaperId: String,
    @SerializedName("state")val state: Int
)


data class StudentAnswerResponse(
    @SerializedName("_id") val id: String,
    @Embedded val studentAnswer: StudentAnswerRequest
)