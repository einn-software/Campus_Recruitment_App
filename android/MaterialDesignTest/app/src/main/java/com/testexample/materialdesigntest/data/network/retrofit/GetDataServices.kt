package com.testexample.materialdesigntest.data.network.retrofit

import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.ExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import retrofit2.http.*

interface GetDataServices {

    @POST("login/student")
    fun authStudent(@Body loginRequest: StudentLoginRequest): Single<AuthResponse>

    @GET("student")
    fun getStudent(@Header("auth-token") token: String) : Flowable<Student>

    @GET("")
    fun authCollege(email:String, password: String): Single<String>

    @GET("")
    fun getCollege(token: String) : Flowable<College>

    @GET("instruction/{code}/{date}")
    fun getInstructions(@Header("auth-token") token: String , @Path("code") code: String, @Path("date") date: String): Flowable<Instructions>

    @GET("exam")
    fun getQuestionPaper(@Body questionPaperRequest: ExamRequest): Single<QuestionPaperComplete>

    @GET("question")
    fun getQuestion(): Single<Question>



    companion object Factory {
        fun create(): GetDataServices {
            val retrofit = retrofit2.Retrofit.Builder()
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .addConverterFactory(ScalarsConverterFactory.create())
                .baseUrl(Constants.BASE_URL)
                .build()

            return retrofit.create(GetDataServices::class.java)
        }
    }
}