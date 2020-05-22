package com.testexample.materialdesigntest.data.model

import com.google.gson.annotations.SerializedName


data class Instructions(
    @SerializedName("_id")val id: String,
    @SerializedName("code")val collegeCode: String,
    @SerializedName("message")val message: String,
    @SerializedName("year")val year: String,
    @SerializedName("month")val month: String,
    @SerializedName("day")val day: String,
    @SerializedName("_v")val version: Int
)