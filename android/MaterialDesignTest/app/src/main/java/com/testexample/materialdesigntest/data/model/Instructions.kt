package com.testexample.materialdesigntest.data.model

import com.google.gson.annotations.SerializedName


data class Instructions(
    @SerializedName("_id")val id: String,
    @SerializedName("message")val message: String,
    @SerializedName("code")val collegeCode: Int,
    @SerializedName("year")val year: Int,
    @SerializedName("month")val month: Int,
    @SerializedName("day")val day: Int,
    @SerializedName("_v")val version: Int
)