package com.testexample.materialdesigntest.data.session

import android.content.Context
import android.content.SharedPreferences
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.AuthResponse

class SessionManager(context: Context):
    ISessionManager {
    private var preferences: SharedPreferences
            = context.getSharedPreferences(context
            .getString(R.string.app_name),
            Context.MODE_PRIVATE)


    companion object {
        const val USER_EMAIL = "user_email"
        const val USER_ID = "user_id"
        const val USER_TYPE = "user_type"
        const val USER_TOKEN = "user_token"
    }

    override fun saveUserSession(session: AuthResponse) {
        val editor = preferences.edit()
        editor.putString(USER_EMAIL, session.email)
        editor.putString(USER_ID, session.id)
        editor.putString(USER_TYPE, session.userType)
        editor.putString(USER_TOKEN, session.token)
        editor.apply()
    }

    override fun getUserAuthToken(): String? {
        return preferences.getString(USER_TOKEN, null)
    }

    override fun getUserEmail(): String? {
        return preferences.getString(USER_EMAIL, null)
    }

    override fun getUserId(): String? {
        return preferences.getString(USER_ID, null)
    }

    override fun getUserType(): String? {
        return preferences.getString(USER_TYPE, null)
    }
}

