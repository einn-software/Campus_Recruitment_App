package com.testexample.materialdesigntest.data.network

import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable
import retrofit2.http.GET

interface GetDataServices {

    @GET("")
    fun authStudent(): String

    @GET("")
    fun getStudent() : Flowable<Student>
}