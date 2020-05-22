package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName

data class CollegeResponse(
    @SerializedName("_id") val collegeId: String,
    @SerializedName("name") val collegeName: String?,
    @SerializedName("code") val collegeCode: Long,
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