package com.testexample.materialdesigntest.data.model

import com.google.gson.annotations.SerializedName


data class Instructions(
    @SerializedName("_id")val id: String,
    @SerializedName("code")val collegeCode: String,
    @SerializedName("day")val date: Int,
    @SerializedName("message")val message: String,
    @SerializedName("month") val month: Int,
    @SerializedName("year") val year: Int
)
