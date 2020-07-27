package com.innobitsystems.campusrecruiter.utils

import android.content.Context
import com.hypertrack.hyperlog.LogFormat


internal class CustomLogMessageFormat(context: Context) : LogFormat(context) {

    override fun getFormattedLogMessage(logLevelName: String, tag: String, message: String, timeStamp: String,
                                        senderName: String?, osVersion: String?, deviceUUID: String): String? {
        return "$timeStamp : $logLevelName/$tag : $deviceUUID : $message"
    }
}
