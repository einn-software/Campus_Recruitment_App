package com.testexample.materialdesigntest.data.network

import com.google.gson.GsonBuilder
import io.reactivex.schedulers.Schedulers
import retrofit2.Retrofit
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory

open class ApiClient {

    val myAppServices: GetDataServices

    init {
        val gSon =GsonBuilder()
            .setLenient()
            .create()

        val retrofit = Retrofit
            .Builder()
            .baseUrl(BASE_URL)
            .addCallAdapterFactory(RxJava2CallAdapterFactory
                .createWithScheduler(Schedulers.io()))
            .addConverterFactory(GsonConverterFactory.create(gSon))
            .build()

        myAppServices = retrofit.create(GetDataServices::class.java)
    }

    companion object {
        private val BASE_URL = ""
        private var apiClient: ApiClient? = null

        val instance: ApiClient get() {
            if (apiClient == null){
                apiClient = ApiClient()
            }
            return apiClient as ApiClient
        }
    }


}