package com.testexample.materialdesigntest.data.session

interface ISessionManager {
    fun getUserAuthToken(): String?
    fun getUserEmail(): String?
    fun getUserId(): String?
    fun getUserType(): String?
    fun saveUserSession(session: UserSession)
}