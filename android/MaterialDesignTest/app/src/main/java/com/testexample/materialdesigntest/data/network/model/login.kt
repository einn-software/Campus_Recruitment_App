package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName
import org.json.JSONObject

data class StudentLoginRequest(
    @SerializedName("roll")val rollNo: String,
    @SerializedName("code")val code: Int,
    @SerializedName("password")val password: String
    )

data class AuthResponse(
    @SerializedName("token")val token: String,
    @SerializedName("_id")val id: String,
    @SerializedName("email")val email: String,
    @SerializedName("user_type")val userType: String
)

data class UserRequest(
    @SerializedName("token")val token: String,
    @SerializedName("_id")val id: String
)

data class CollegeLoginRequest(
    @SerializedName("email")val email: String,
    @SerializedName("password")val password: String
)