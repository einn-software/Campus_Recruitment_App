package com.testexample.materialdesigntest.data.network.repository

import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.session.SessionManager
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.junit.ClassRule
import org.mockito.Mockito.mock

class ExaminationRemoteRepoTest {

    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    lateinit var repository: IExaminationRemoteRepo
    val  TAG = "Testing ExaminationRemoteRepository"
    lateinit var token : String
    val context = mock(Context::class.java)
    lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {

        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callApiForQuestionPaperTest() {
        repository = ExaminationRemoteRepo()
        val result = repository.callApiForQuestionPaper(token,"515","29/01/2020")
            .subscribe(
                {it -> Log.d(TAG," Result is $it")},
                {err -> Log.d(TAG, err.localizedMessage!!)})


    }

    @Test
    fun callApiForQuestionTest() {
    }
}