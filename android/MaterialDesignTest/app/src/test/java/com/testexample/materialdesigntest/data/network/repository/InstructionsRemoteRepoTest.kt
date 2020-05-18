package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.ClassRule

class InstructionsRemoteRepoTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    val TAG = "Testing InstructionRemoteRepo"
    lateinit var instructionRemoteRepo: IInstructionsRemoteRepo
    lateinit var token : String
    lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken()
        instructionRemoteRepo = InstructionsRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callInstructionsApi() {
        instructionRemoteRepo.callInstructionsApi(token,"802","29-06-2020")
            .subscribe(
                {success -> println("Instruction is $success")},
            { error -> println(error.localizedMessage) })
    }
}