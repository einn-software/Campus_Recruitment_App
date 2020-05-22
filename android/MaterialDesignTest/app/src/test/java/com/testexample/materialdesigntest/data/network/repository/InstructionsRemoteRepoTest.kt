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
                        success.id.isBlank() && success.collegeCode.isBlank() && success.year.isBlank() && success.month.isBlank() && success.day.isBlank() && success.message.isBlank() && success.version == 0
                    )
                },
            { error -> println(error.localizedMessage)
                assertTrue("callInstructionsApi_withExistingId(): Verification Failed as received ${error.message}",error.message.toString() != "HTTP 404 Not Found")
            })
    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
        instructionRemoteRepo.callInstructionsApi(token,"abcde")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("callInstructionsApi_withNotExistingId(): Verification Failed ", success != null)
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
                    assertTrue("callInstructionsApi_withSpecialCharId(): Verification Failed ", success != null)

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
                    assertTrue("callInstructionsApi_withNullId(): Verification Failed ", success != null)

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
                    assertTrue("callInstructionsApi_withSpaceAsId(): Verification Failed ", success != null)

                },
                { error -> println(error.localizedMessage)
                    assertTrue("callInstructionsApi_withSpaceAsId(): Verification Failed as received ${error.message}",error.message.toString()== "HTTP 404 Not Found")
                })
    }
}