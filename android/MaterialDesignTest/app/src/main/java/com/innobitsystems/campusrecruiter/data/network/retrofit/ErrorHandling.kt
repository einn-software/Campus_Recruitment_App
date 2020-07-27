package com.innobitsystems.campusrecruiter.data.network.retrofit

import com.google.gson.Gson
import com.innobitsystems.campusrecruiter.data.network.model.ErrorResponse
import io.reactivex.Flowable
import io.reactivex.Single
import java.io.IOException
import java.net.SocketTimeoutException

fun <T> Single<T>.handelNetworkError() =
    onErrorResumeNext { e ->
        when (e) {
            is OfflineException ->
                return@onErrorResumeNext Single.error(Exception("check your internet connection "))
            is SocketTimeoutException ->
                return@onErrorResumeNext Single.error(Exception("server not found"))
            is retrofit2.HttpException ->
            {
                val gson = Gson()
                val responseBody:ErrorResponse = gson
                    .fromJson(e.response().errorBody()?.charStream(),ErrorResponse::class.java)
                println(responseBody)
                return@onErrorResumeNext Single
                    .error(Exception(responseBody.message))
            }
            is IOException ->
                return@onErrorResumeNext Single.error(Exception("Network error"))
            else -> return@onErrorResumeNext Single.error(e)
        }
    }

fun <T> Flowable<T>.handelNetworkError() =
    onErrorResumeNext { e : Throwable ->
        when (e) {
            is OfflineException ->
                return@onErrorResumeNext Flowable.error(Exception("check your internet connection"))
            is SocketTimeoutException ->
                return@onErrorResumeNext Flowable.error(Exception("server not found"))
            is retrofit2.HttpException ->
            {
                val gson = Gson()
                val responseBody:ErrorResponse = gson
                    .fromJson(e.response().errorBody()?.charStream(),ErrorResponse::class.java)
                println(responseBody)
                return@onErrorResumeNext Flowable
                    .error(Exception(responseBody.message))
            }
            is IOException ->
                return@onErrorResumeNext Flowable.error(Exception("Network error"))
            else -> return@onErrorResumeNext Flowable.error(e)
        }
    }


class OfflineException : IOException() {
    override val message: String?
        get() = "No Internet!"
}
