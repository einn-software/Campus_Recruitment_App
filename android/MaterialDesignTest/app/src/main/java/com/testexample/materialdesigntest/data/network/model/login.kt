package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName
import org.json.JSONObject

data class StudentLoginRequest(
    @SerializedName("roll")val rollNo: Long,
    @SerializedName("password")val password: String
    )

data class AuthResponse(
    @SerializedName("token")val token: String
)

data class CollegeLoginRequest(
    @SerializedName("email")val email: String,
    @SerializedName("password")val password: String
)