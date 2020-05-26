package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

import org.junit.ClassRule

class InstructionsRemoteRepoTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    val tag = "Testing InstructionRemoteRepo"
    private lateinit var instructionRemoteRepo: IInstructionsRemoteRepo
    private lateinit var token : String
    private lateinit var tokenRepository: UserRemoteRepositoryTest

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
    fun callInstructionsApi_withExistingId() {
        instructionRemoteRepo.callInstructionsApi(token,"1234")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue(
                        "callInstructionsApi_withExistingId(): Verification Failed",
                        success.id.isBlank() && success.collegeCode <= 2000 && success.year <= 0 && 1<= success.month && success.month <= 12 && 1<= success.day && success.day <= 31 && success.message.isBlank() && success.version == 0
                    )
                },
            { error -> println(error.localizedMessage)
               fail("Verification failed with message: ${error.message}")
            })
    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
        instructionRemoteRepo.callInstructionsApi(token,"abate")
            .subscribe(
                {success -> println("Instruction is $success")
                    fail("callInstructionsApi_withNotExistingId(): Verification failed with message: $success")
                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withNotExistingId(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withSpecialCharId() {
        instructionRemoteRepo.callInstructionsApi(token,"@#%$^&")
            .subscribe(
                {success -> println("Instruction is $success")
                    fail("callInstructionsApi_withSpecialCharId(): Verification failed with message: $success")
                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withSpecialCharId(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withNullId() {
        instructionRemoteRepo.callInstructionsApi(token,"")
            .subscribe(
                {success -> println("Instruction is $success")
                    fail("callInstructionsApi_withNullId(): Verification failed with message: $success")
                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withNullId(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withSpaceAsId() {
        instructionRemoteRepo.callInstructionsApi(token," ")
            .subscribe(
                {success -> println("Instruction is $success")
                    fail("callInstructionsApi_withSpaceAsId(): Verification failed with message: $success")
                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withSpaceAsId(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withInvalidToken() {
        instructionRemoteRepo.callInstructionsApi("","12345")
            .subscribe(
                {success -> println("Instruction is $success")
                    fail("callInstructionsApi_withInvalidToken(): Verification failed with message: $success")
                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withInvalidToken(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 401 Unauthorized Error")
                })
    }
}