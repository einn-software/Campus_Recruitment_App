package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
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
        token = tokenRepository.setToken().token
        instructionRemoteRepo = InstructionsRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callInstructionsApi_withExistingId() {
        var failure = ""
        var instructions = Instructions("","",0,0,0,0,0)
        instructionRemoteRepo.callInstructionsApi(token,"5ed646d0c3e2665b236111f7")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withExistingId(): Instruction is $success")
                        instructions = success
                    },
                { error -> println("callInstructionsApi_withExistingId(): ${error.localizedMessage}")
                    failure = error.message.toString()
                })

        if(failure.isBlank()){
        assertFalse(
                "callInstructionsApi_withExistingId(): Verification Failed",
                instructions.id.isBlank() && instructions.collegeCode <= 2000 && instructions.year <= 0 && 1<= instructions.month && instructions.month <= 12 && 1<= instructions.day && instructions.day <= 31 && instructions.message.isBlank() && instructions.version == 0
        )}
        else {
            fail("callInstructionsApi_withExistingId(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
         var failure =""
        instructionRemoteRepo.callInstructionsApi(token,"123456")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withNotExistingId(): Instruction is $success")
                    },
                    { error -> println("callInstructionsApi_withNotExistingId(): ${error.localizedMessage}")
                        failure = error.message.toString()
                    })

        if (failure.isBlank()){
            fail("callInstructionsApi_withNotExistingId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withNotExistingId(): Verification Failed as received $failure", "704 Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withSpecialCharId() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi(token,"@#%$^&")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withSpecialCharId(): Instruction is $success")
                    },
                    { error -> println("callInstructionsApi_withSpecialCharId(): ${error.localizedMessage}")
                        failure = error.message.toString()
                    })

        if (failure.isBlank()){
            fail("callInstructionsApi_withSpecialCharId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withSpecialCharId(): Verification Failed as received $failure", "704 Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withNullId() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi(token,"")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withNullId(): Instruction is $success")
                    },
                    { error -> println("callInstructionsApi_withNullId(): ${error.localizedMessage}")
                        failure = error.message.toString()
                    })

        if (failure.isBlank()){
            fail("callInstructionsApi_withNullId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withNullId(): Verification Failed as received $failure", "704 Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withSpaceAsId() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi(token," ")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withSpaceAsId(): Instruction is $success")
                    },
                    { error -> println("callInstructionsApi_withSpaceAsId(): ${error.localizedMessage}")
                        failure = error.message.toString()
                    }
                )

        if (failure.isBlank()){
            fail("callInstructionsApi_withSpaceAsId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withSpaceAsId(): Verification Failed as received $failure}", "704 Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withInvalidToken() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi("1234567890","12345")
                .handelNetworkError()
                .subscribe(
                    {success -> println("callInstructionsApi_withInvalidToken(): Instruction is $success")
                    },
                    { error -> println("callInstructionsApi_withInvalidToken(): ${error.localizedMessage}")
                        failure = error.message.toString()
                    })

        if (failure.isBlank()){
            fail("callInstructionsApi_withInvalidToken(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withInvalidToken(): Verification Failed as received $failure", "701 Invalid Token", failure)
        }
    }

    @Test
    fun callInstructionsApi_withBlankToken() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi("","12345")
                .handelNetworkError()
                .subscribe(
                        {success -> println("callInstructionsApi_withBlankToken(): Instruction is $success")
                        },
                        { error -> println("callInstructionsApi_withBlankToken(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withBlankToken(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withBlankToken(): Verification Failed as received $failure", "701 Access denied", failure)
        }
    }

    @Test
    fun callInstructionsApi_withInvalidTokenNId() {
        var failure = ""
        instructionRemoteRepo.callInstructionsApi("","12345")
                .handelNetworkError()
                .subscribe(
                        {success -> println("callInstructionsApi_withInvalidTokenNId(): Instruction is $success")
                        },
                        { error -> println("callInstructionsApi_withInvalidTokenNId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withInvalidTokenNId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withInvalidTokenNId(): Verification Failed as received $failure", "701 Access denied", failure)
        }
    }
}
