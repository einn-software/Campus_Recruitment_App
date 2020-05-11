package com.testexample.materialdesigntest.data.session

interface ISessionManager {
    fun getAuthToken(): String?
    fun saveAuthToken(token: String)
}