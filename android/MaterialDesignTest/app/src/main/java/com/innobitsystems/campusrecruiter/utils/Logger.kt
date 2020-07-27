package com.innobitsystems.campusrecruiter.utils

import android.content.Context
import android.util.Log
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.BuildConfig
import okhttp3.*
import java.io.File

class Logger {

    private val TAG = "Logger"

    fun setLogger(context: Context) {
        HyperLog.initialize(context, Constants.LOGSEXPIRYTIME)
        HyperLog.setLogFormat(CustomLogMessageFormat(context))
        HyperLog.setLogLevel(Log.DEBUG)
    }

    fun sendLogs(context: Context) {
        var file: File? = null
        val thread = Thread(Runnable {
            try {
                val tempFile: File = HyperLog.getDeviceLogsInFile(context)
                file = File(tempFile.path)

                val client = OkHttpClient().newBuilder().build()

                val body: RequestBody = MultipartBody.Builder().setType(MultipartBody.FORM)
                        .addFormDataPart("file", tempFile.name,
                                RequestBody.create(MediaType.parse("multipart/form-data"), file))
                        .build()

                val request: Request = Request.Builder()
                        .url(Constants.BASE_URL + "upload/android-logs")
                        .method("POST", body)
                        .build()

                val response: Response = client.newCall(request).execute()
                if (response.code() == Constants.SUCCESS) {
                    HyperLog.i(TAG, "Successfully sent logs to server")
                } else {
                    HyperLog.e(TAG, "Failed to send logs: code=${response.code()} message=${response.message()}")
                }

            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                if (BuildConfig.BUILD_TYPE != "debug" && file?.exists()!!) {
                    file?.delete()
                    HyperLog.i(TAG, "Successfully deleted log file ${file?.name}")
                }

            }
        })

        thread.start()
    }

}

