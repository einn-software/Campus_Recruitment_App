package com.testexample.materialdesigntest.data.model

import com.google.gson.annotations.SerializedName


data class Instructions(
    @SerializedName("_id")val id: String,
    @SerializedName("college_code")val collegeCode: String,
    @SerializedName("date")val examDate: String,
    @SerializedName("message")val message: String,
    @SerializedName("_v")val version: Int
)