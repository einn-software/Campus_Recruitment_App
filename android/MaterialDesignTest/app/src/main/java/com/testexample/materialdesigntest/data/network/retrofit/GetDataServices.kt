package com.testexample.materialdesigntest.data.network.retrofit

import com.testexample.materialdesigntest.data.model.*
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.utils.Constants
import io.reactivex.Flowable
import io.reactivex.Single
import okhttp3.MultipartBody
import okhttp3.RequestBody
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
    fun studentForgotPassword(@Body email: String): Single<MessageResponse>

    @POST("login/tpos")
    fun authTPO(@Body loginRequest: TpoLoginRequest): Single<AuthResponse>

    @GET("tpos/{id}")
    fun getTPO(@Header("auth-token") token: String,
               @Path("id") tpoId: String): Flowable<TPO>

    @POST("forgot-password/tpos")
    fun tpoForgotPassword(@Body email: String):Single<MessageResponse>

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

    @PUT("colleges/{code}")
    fun updateCollege(@Header("auth-token") token: String,
                      @Path("code") code: Int,
                      @Body collegeDetails: UpdateCollegeDetails
                      ):
            Single<College>

    @GET("instructions/{id}")
    fun getInstructions(@Header("auth-token") token: String ,
                        @Path("id") InstructionId: String):
            Flowable<Instructions>

    @GET("colleges/{code}/question-papers/{year}")
    fun getQuestionPaper(@Header("auth-token") token: String ,
                         @Path("code") code: Int,
                         @Path("year") year: Int,
                         @Query("month") month: Int,
                         @Query("day") date: Int ):
            Single<QuestionPaper>

    @GET("questions/{id}")
    fun getQuestion(@Header("auth-token") token: String,
                    @Path("id") questionId: String):
            Single<Question>

    @GET("student-answers/{student-id}/{question-paper-id}")
    fun getStudentResponse(@Header("auth-token") token: String ,
                           @Path("student-id") studentId: String,
                           @Path("question-paper-id") questionPaperId: String):
            Single<List<StudentAnswerResponsePlain>>

    @POST("student-answers")
    fun addStudentResponse(@Header("auth-token") token: String ,
                           @Body request : StudentAnswerRequest): Single<StudentAnswerResponsePlain>

    @PUT("student-answers/{id}")
    fun updateStudentResponse(@Header("auth-token") token: String ,
                              @Path("id") id: String,
                              @Body request: StudentAnswerRequest): Single<StudentAnswerResponsePlain>

    @POST("final-submission")
    fun endExam(@Header("auth-token") token: String ,
                @Body endExamRequest: EndExamRequest): Single<MessageResponse>

    @GET("colleges/{code}/results/{question-paper-id}")
    fun getStudentResultList(@Header("auth-token") token: String,
                            @Path("code") code: Int,
                            @Path("question-paper-id") question_paper_id: String):
            Flowable<List<CollegeWiseResultResponse>>

    @GET("colleges/{code}/results/{roll}/question-papers/{question-paper-id}")
    fun getStudentResult(@Header("auth-token") token: String,
                         @Path("code") code: Int,
                         @Path("roll") roll: String,
                         @Path("question-paper-id") questionPaperId: String):
            Single<Result>

    @Multipart
    @POST("upload")
    fun uploadFile(
            @Header("auth-token") token: String,
            @Part("email") details: RequestBody,
            @Part file: MultipartBody.Part
    ): Single<String>

    @GET("question-papers/{code}")
    fun getQuestionPaperList(@Header("auth-token") token: String,
                             @Path("code") code: Int):
            Flowable<List<QuestionPaperListResponse>>



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