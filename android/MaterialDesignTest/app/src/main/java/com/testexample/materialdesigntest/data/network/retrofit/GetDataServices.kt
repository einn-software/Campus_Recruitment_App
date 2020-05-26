package com.testexample.materialdesigntest.data.network.retrofit

import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.AuthResponse
import com.testexample.materialdesigntest.data.network.model.CollegeLoginRequest
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

    @POST("login/college")
    fun authCollege(@Body loginRequest: CollegeLoginRequest): Single<AuthResponse>

    @GET("college")
    fun getCollege(@Header("auth-token") token: String): Flowable<College>

    @GET("instruction/{id}")
    fun getInstructions(@Header("auth-token") token: String,
                    @Path("id") instructionId: String):
            Single<Instructions>

    @GET("questionPaper/{code}")
    fun getQuestionPaper(@Header("auth-token") token: String ,
                         @Path("code") code: String):
            Single<QuestionPaperComplete>

    @GET("question/{id}")
    fun getQuestion(@Header("auth-token") token: String,
                    @Path("id") questionId: String):
            Single<Question>

    @GET("colleges/{code}/results/{question_paper_id}")
    fun getResultFromQuesId(@Header("auth-token") token: String,
                            @Path("code") code: Int,
                  @Path("question_paper_id") question_paper_id: String):
            Single<List<Result>>

    @GET("colleges/{code}/results/{student-id}")
    fun getResultFromStudentId(@Header("auth-token") token: String,
                               @Path("code") code: Int,
                  @Path("student_id") student_id: String):
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