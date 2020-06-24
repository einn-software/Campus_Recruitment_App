package com.testexample.materialdesigntest.data.network.model

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

data class FetchExamRequest(
    @SerializedName("code")val code: Int,
    @SerializedName("year")val year: Int,
    @SerializedName("month")val month: Int,
    @SerializedName("day")val date: Int
)

data class FetchResultRequest(
        @SerializedName("code")val collegeCode: Int,
        @SerializedName("roll")val rollNo: String,
        @SerializedName("question_paper_id")val questionPaperId: String
)

@Parcelize
data class EndExamRequest(
    @SerializedName("question_paper_id")val questionPaperId: String,
    @SerializedName("student_id")val studentId: String
) : Parcelable

data class EndExamResponse(
    @SerializedName("message")val message: String,
    @SerializedName("status")val status: Int
)
