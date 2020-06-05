package com.testexample.materialdesigntest.data.network.retrofit

import com.google.gson.annotations.SerializedName
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

    @GET("students/{id}")
    fun getStudent(@Header("auth-token") token: String,
                   @Path("id") studentId: String):
            Flowable<Student>

    @GET("colleges/{code}/students")
    fun getStudentList(@Header("auth-token") token: String,
                       @Path("code") code: Int ): Flowable<List<StudentResponse>>

    @POST("forgot-password/students")
    fun studentForgotPassword(@Body email: String): Single<String>

    @POST("login/tpos")
    fun authTPO(@Body loginRequest: CollegeLoginRequest): Single<AuthResponse>

    @GET("tpos/{id}")
    fun getTPO(@Header("auth-token") token: String,
               @Path("id") tpoId: String): Flowable<TPO>

    @POST("forgot-password/tpos")
    fun tpoForgotPassword(@Body email: String):Single<String>

    @PUT("tpos/{id}")
    fun updateTPO(@Header("auth-token") token: String,
                  @Path("id") TPOId: String,
                  @Body updateParameters: TPOUpdateRequest): Flowable<TPO>

    @GET("colleges")
    fun getCollegeList(): Flowable<List<CollegeResponse>>

    @GET("colleges/{code}")
    fun getCollege(@Header("auth-token") token: String,
                   @Path("code") code: Int ):
            Single<College>

    @PUT("colleges/{id}")
    fun updateCollege()

    @GET("instructions/{id}")
    fun getInstructions(@Header("auth-token") token: String ,
                        @Path("id") InstructionId: String):
            Flowable<Instructions>

    @GET("colleges/{code}/question-papers/{year}")
    fun getQuestionPaper(@Header("auth-token") token: String ,
                         @Path("code") code: Int,
                         @Path("year") year: Int,
                         @Query("month") month: Int,
                         @Query("date") date: Int):
            Single<QuestionPaperComplete>

    @GET("questions/{id}")
    fun getQuestion(@Header("auth-token") token: String,
                    @Path("id") questionId: String):
            Single<Question>

    @GET("student-answers/{student-id}/{question-paper-id}/{question-id}")
    fun getStudentResponse(@Header("auth-token") token: String ,
                           @Path("student-id") studentId: String,
                           @Path("question-paper-id") QuestionPaperId: String,
                           @Path("question-id") questionId: String): Single<Question>

    @POST("student-answers")
    fun addStudentResponse(@Body request : StudentAnswerRequest): Single<StudentAnswerResponse>

    @PUT("student-answers/{id}")
    fun updateStudentResponse(@Path("id") id: String,
                              @Body request: StudentAnswerRequest): Single<StudentAnswerResponse>

    @POST("final-submission/")
    fun endExam(@Body endExamRequest: EndExamRequest): Single<EndExamResponse>

    @GET("colleges/{code}/results/{question-paper-id}")
    fun getStudentResultList(@Header("auth-token") token: String):
            Flowable<List<CollegeWiseResultResponse>>







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