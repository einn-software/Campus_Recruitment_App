package com.testexample.materialdesigntest.data.session

import com.testexample.materialdesigntest.data.network.model.AuthResponse

interface ISessionManager {
    fun getUserAuthToken(): String?
    fun getUserEmail(): String?
    fun getUserId(): String?
    fun getUserType(): String?
    fun saveUserSession(session: AuthResponse)
}
