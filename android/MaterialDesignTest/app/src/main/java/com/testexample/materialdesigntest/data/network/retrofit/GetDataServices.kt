package com.testexample.materialdesigntest.data.network.retrofit

import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import retrofit2.http.*

interface GetDataServices {

    @POST("login/students")
    fun authStudent(@Body loginRequest: StudentLoginRequest): Single<AuthResponse>

    @GET("student/{id}")
    fun getStudent(@Header("auth-token") token: String,
                   @Path("id") studentId: String):
            Flowable<Student>

    @GET("colleges/{code}/students")
    fun getStudentList(@Header("auth-token") token: String,
                       @Path("code") code: String ): Flowable<List<StudentResponse>>

    @POST("forgot-password/students")
    fun studentForgotPassword(@Body email: String): Single<String>

    @POST("login/tpos")
    fun authTPO(@Body loginRequest: CollegeLoginRequest): Single<AuthResponse>

    @GET("tpos/{id}")
    fun getTPO(@Header("auth-token") token: String, @Path("id") tpoId: String): Flowable<College>

    @POST("forgot-password/tpos")
    fun tpoForgotPassword(@Body email: String):Single<String>

    @GET("colleges")
    fun getCollegeList(): Flowable<List<CollegeResponse>>

    @GET("colleges/{code}")
    fun getCollege(@Header("auth-token") token: String,
                   @Path("code") code: String ):
            Single<College>

    @GET("instruction/{code}/{date}")
    fun getInstructions(@Header("auth-token") token: String ,
                        @Path("code") code: String,
                        @Path("date") date: String):
            Flowable<Instructions>

    @GET("questionPaper/{code}")
    fun getQuestionPaper(@Header("auth-token") token: String ,
                         @Path("code") code: String):
            Single<QuestionPaperComplete>

    @GET("question/{id}")
    fun getQuestion(@Header("auth-token") token: String,
                    @Path("id") questionId: String):
            Single<Question>

    @GET("result/{roll}")
    fun getResult(@Header("auth-token") token: String,
                  @Path("roll") rollNo: Long):
            Single<Result>



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