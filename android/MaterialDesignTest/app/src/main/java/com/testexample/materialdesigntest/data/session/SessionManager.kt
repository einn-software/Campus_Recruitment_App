package com.testexample.materialdesigntest.data.session

import android.content.Context
import android.content.SharedPreferences
import com.testexample.materialdesigntest.R

class SessionManager(context: Context):
    ISessionManager {
    private var preferences: SharedPreferences
            = context.getSharedPreferences(context
            .getString(R.string.app_name),
            Context.MODE_PRIVATE)

    companion object {
        const val USER_TOKEN = "token"
    }

    override fun saveAuthToken(token: String) {
        preferences
            .edit()
            .putString(USER_TOKEN, token)
            .apply()
    }

    override fun getAuthToken(): String? {
        return preferences.getString(USER_TOKEN, null)
    }
}