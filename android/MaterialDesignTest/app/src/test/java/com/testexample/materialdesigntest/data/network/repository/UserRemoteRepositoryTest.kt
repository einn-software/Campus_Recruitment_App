package com.testexample.materialdesigntest.data.network.repository

import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.Scheduler
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.junit.ClassRule
import org.mockito.Mockito

class UserRemoteRepositoryTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    lateinit var repository: IUserRemoteRepository
    val  TAG = "Testing UserRemoteRepository"

    @Before
    fun setUp() {
        repository = UserRemoteRepository()
    }

    @After
    fun tearDown() {

    }

    fun setToken(): String{
        setUp()
        var token = ""
        repository.authStudent(123456789, "15787851")
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(
                {success -> token = success
                    println("token is $token")},
                { error -> println(error.localizedMessage) })

        return token
    }


    @Test
    fun authStudentTest() {
        var token: String = ""
         repository.authStudent(123456789, "15787851")
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(
                {success -> token = success
                println("token is $token")},
                { error -> println(error.localizedMessage) })
    }

    @Test
    fun getStudentTest() {
    }

    @Test
    fun getCollegeTest() {
    }

    @Test
    fun authCollegeTest() {
    }
}