package com.testexample.materialdesigntest.utils

import com.google.gson.GsonBuilder
import com.google.gson.annotations.SerializedName
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

class Constants {
    companion object {
        internal const val BASE_URL = "http://45.122.120.109:3800/"
        internal const val API_KEY = ""
        internal const val APP_DB_NAME = ""
        internal const val PREF_NAME = ""
        internal const val EMPTY_EMAIL_ERROR = 1001
        internal const val EMPTY_ROLL_NO_ERROR = 1001
        internal const val INVALID_EMAIL_ERROR = 1002
        internal const val INVALID_ROLL_NO_ERROR = 1002
        internal const val EMPTY_PASSWORD_ERROR = 1003
        internal const val LOGIN_FAILURE = 1004
        internal const val NULL_INDEX = -1L

        // Constants for Session
        internal const val EMAIL = "email"
        internal const val TOKEN = "token"
        internal const val ID = "_id"
        internal const val USERTYPE = "user_type"

        enum class LoggedInMode constructor(val type: Int) {
            LOGGED_IN_MODE_LOGGED_OUT(0),
            LOGGED_IN_MODE_SERVER(1)
        }


    }


}