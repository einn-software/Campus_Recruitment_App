package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName

data class FetchExamRequest(
    @SerializedName("code")val code: Int,
    @SerializedName("year")val year: Int,
    @SerializedName("month")val month: Int,
    @SerializedName("day")val date: Int
)

data class EndExamRequest(
    @SerializedName("question_paper_id")val questionPaperId: String,
    @SerializedName("student_id")val studentId: String
)

data class EndExamResponse(
    @SerializedName("message")val message: String,
    @SerializedName("status")val status: Int
)
