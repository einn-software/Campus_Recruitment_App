package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.ClassRule

class PreExamInstructionsRemoteRepoTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    val TAG = "Testing InstructionRemoteRepo"
    lateinit var instructionRemoteRepoPreExam: IPreExamInstructionsRemoteRepo
    lateinit var token : String
    lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken().token
        instructionRemoteRepoPreExam = PreExamInstructionsRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callInstructionsApi() {
        instructionRemoteRepoPreExam.callInstructionsApi(token,  "")
            .subscribe(
                {success -> println("Instruction is $success")},
                { error -> println(error.localizedMessage) })
    }
}