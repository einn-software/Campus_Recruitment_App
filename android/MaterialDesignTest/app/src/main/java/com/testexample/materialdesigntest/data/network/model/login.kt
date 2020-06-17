package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName

data class StudentLoginRequest(
    @SerializedName("roll") val rollNo: String,
    @SerializedName("code") val code: Int,
    @SerializedName("password") val password: String
    )

data class AuthResponse(
    @SerializedName("email")val email: String,
    @SerializedName("token")val token: String,
    @SerializedName("_id")val id: String,
    @SerializedName("user_type")val userType: String,
    val error: ErrorResponse
)

data class UserRequest(
    @SerializedName("token")val token: String,
    @SerializedName("_id")val id: String
)

data class TpoLoginRequest(
    @SerializedName("email")val email: String,
    @SerializedName("password")val password: String
)

data class ErrorResponse(
    @SerializedName("status")val status: Int,
    @SerializedName("message")val message: String,
    @SerializedName("error_info")val errorInfo: String,
    @SerializedName("server_msg")val serverMessage: String,
    @SerializedName("server_error_ref")val serverReference: String
)