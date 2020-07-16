package com.testexample.materialdesigntest.data.session

import android.content.Context
import android.content.SharedPreferences
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.AuthResponse

class SessionManager(context: Context) : ISessionManager {

    private val TAG = "SessionManager"
    private var preferences: SharedPreferences = context.getSharedPreferences(context
            .getString(R.string.app_name), Context.MODE_PRIVATE)

    companion object {
        const val USER_EMAIL = "user_email"
        const val USER_ID = "user_id"
        const val USER_TYPE = "user_type"
        const val USER_TOKEN = "user_token"
        const val TIME_LEFT_AFTER_PAUSE = "time_left_after_pause"
    }

    override fun saveUserSession(session: AuthResponse) {
        HyperLog.d(TAG, "<< saveUserSession()")
        preferences.edit().apply {
            putString(USER_EMAIL, session.email)
            putString(USER_ID, session.id)
            putString(USER_TYPE, session.userType)
            putString(USER_TOKEN, session.token)
            apply()
        }
        HyperLog.d(TAG, ">> saveUserSession()")
    }

    override fun savePauseTime(timeInMil: Long) {
        Log.d(TAG, "<< savePauseTime($timeInMil)")
        preferences.edit().apply{
            putLong(TIME_LEFT_AFTER_PAUSE, timeInMil)
            apply()
        }
        Log.d(TAG, ">> savePauseTime()")
    }

    override fun getPauseTime(): Long {
        Log.d(TAG, "<< getPauseTime()")
        Log.d(TAG, ">> getPauseTime()")
        return preferences.getLong(TIME_LEFT_AFTER_PAUSE, 0)
    }

    override fun getUserAuthToken(): String? {
        HyperLog.d(TAG, "<< getUserAuthToken()")
        HyperLog.d(TAG, ">> getUserAuthToken()")
        return preferences.getString(USER_TOKEN, null)
    }

    override fun getUserEmail(): String? {
        HyperLog.d(TAG, "<< getUserEmail()")
        HyperLog.d(TAG, ">> getUserEmail()")
        return preferences.getString(USER_EMAIL, null)
    }

    override fun getUserId(): String? {
        HyperLog.d(TAG, "<< getUserEmail()")
        HyperLog.d(TAG, ">> getUserEmail()")
        return preferences.getString(USER_ID, null)
    }

    override fun getUserType(): String? {
        HyperLog.d(TAG, "<< getUserType()")
        HyperLog.d(TAG, ">> getUserType()")
        return preferences.getString(USER_TYPE, null)
    }
}
