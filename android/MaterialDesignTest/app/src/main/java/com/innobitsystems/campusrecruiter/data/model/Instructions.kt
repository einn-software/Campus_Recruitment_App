package com.innobitsystems.campusrecruiter.data.model

import com.google.gson.annotations.SerializedName


data class Instructions(
    @SerializedName("_id")val id: String,
    @SerializedName("code")val collegeCode: Int,
    @SerializedName("day")val date: Int,
    @SerializedName("message")val message: String,
    @SerializedName("month") val month: Int,
    @SerializedName("year") val year: Int
)
