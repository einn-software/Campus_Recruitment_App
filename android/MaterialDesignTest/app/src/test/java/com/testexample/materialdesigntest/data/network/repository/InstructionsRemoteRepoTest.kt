package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import org.junit.After
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
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
                        "Verification for Id is Failed Received Null Parameter",
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                },
            { error -> println(error.localizedMessage)
                assertFalse("Verification Failed as received ${error.message}",error.message == "HTTP 404 Not Found")
            })

    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
        instructionRemoteRepo.callInstructionsApi(token,"abcde")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue(
                        "Verification for Id is Failed Received Null Parameter",
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                },
                { error -> println(error.localizedMessage)
                    println(error.message)
                    assertTrue("Verification Passed as received ${error.message}",error.message == "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withSpecialCharId() {
        instructionRemoteRepo.callInstructionsApi(token,"@#%$^&")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue(
                        "Verification for Id is Failed Received Null Parameter",
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                },
                { error -> println(error.localizedMessage)
                    assertTrue("Verification Passed as received ${error.message}",error.message == "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withNullId() {
        instructionRemoteRepo.callInstructionsApi(token,"")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue(
                        "Verification for Id is Failed Received Null Parameter",
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                },
                { error -> println(error.localizedMessage)
                    assertTrue("Verification Passed as received ${error.message}",error.message == "HTTP 404 Not Found")
                })
    }

    @Test
    fun callInstructionsApi_withSpaceAsId() {
        instructionRemoteRepo.callInstructionsApi(token," ")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue(
                        "Verification for Id is Failed Received Null Parameter",
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                    },
                { error -> println(error.localizedMessage)
                    assertTrue("Verification Passed as received ${error.message}",error.message == "HTTP 404 Not Found")
                })
    }
}