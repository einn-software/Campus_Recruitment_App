package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName
import java.util.*

data class ExamRequest(
    @SerializedName("code")val code: String,
    @SerializedName("date")val date: Date
)