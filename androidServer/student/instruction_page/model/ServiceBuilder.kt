package Exam_App.student.instruction_page.model

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ServiceBuilder {
    private const val URL = "jsonplaceholder.typicode.com"
    private val okHttp : OkHttpClient.Builder = OkHttpClient.Builder()
    private val builder:Retrofit.Builder = Retrofit.Builder().baseUrl(URL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttp.build())
    // create retrofit instence
    private val retrofit : Retrofit = builder.build()

    fun <T> buildService(serviceType: Class<T>): T {
        return retrofit.create(serviceType)
    }
}