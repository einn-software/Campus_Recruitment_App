package com.innobitsystems.campusrecruiter.data.session

import com.innobitsystems.campusrecruiter.data.network.model.AuthResponse

interface ISessionManager {
    fun getUserAuthToken(): String?
    fun getUserEmail(): String?
    fun getUserId(): String?
    fun getUserType(): String?
    fun saveUserSession(session: AuthResponse)
    fun savePauseTime(timeInMil: Long)
    fun getPauseTime(): Long
}
