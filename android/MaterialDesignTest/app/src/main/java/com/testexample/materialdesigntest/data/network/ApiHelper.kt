package com.testexample.materialdesigntest.data.network

import io.reactivex.Flowable
import retrofit2.http.GET

class ApiHelper {

    @GET("")
    fun getStudent(studentE): Flowable<>
}