package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.junit.ClassRule

class ResultRemoteRepoTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    val TAG = "Testing ResultRemoteRepo"
    lateinit var resultRemoteRepo: IResultRemoteRepo
    lateinit var token : String
    lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken().token
        resultRemoteRepo = ResultRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callApiForResult() {
        resultRemoteRepo.callApiForResult(token, 123456789)
            .subscribe(
                {success -> println("Result  is $success")},
                { error -> println(error.localizedMessage) })
    }

    @Test
    fun saveResult() {
    }
}