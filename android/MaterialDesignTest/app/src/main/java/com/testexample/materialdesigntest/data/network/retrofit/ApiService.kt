package com.testexample.materialdesigntest.data.network.retrofit

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Observable
import retrofit2.http.GET

interface ApiService {

    @GET("login/student")
    fun getStudent():Observable<Student>

    @GET("login/college")
    fun getCollege():Observable<College>
}