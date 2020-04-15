package Exam_App.result.model.request

import Exam_App.result.model.response.exchangeResponse
import retrofit2.Call
import retrofit2.http.GET

interface requestApi {

        @GET("Results")
        fun getResult(): Call<exchangeResponse>
}