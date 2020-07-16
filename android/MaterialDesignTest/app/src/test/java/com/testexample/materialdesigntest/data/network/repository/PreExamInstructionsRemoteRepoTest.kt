package com.testexample.materialdesigntest.data.network.repository

import android.util.Log
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import junit.framework.Assert.*
import org.junit.After
import org.junit.Before
import org.junit.ClassRule
import org.junit.Test

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
    fun callInstructionsApi_withExistingId() {
        var failure = ""
        var instructions = Instructions("",0,0,"",0,0)
        instructionRemoteRepoPreExam.callInstructionsApi(token,"5ed646d0c3e2665b236111f7")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withExistingId():Instruction is $success")
                            instructions = success
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withExistingId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if(failure.isBlank()){
            assertFalse(
                    "callInstructionsApi_withExistingId(): Verification Failed",
                    instructions.id.isBlank() && instructions.collegeCode <= 2000 && instructions.year <= 0 && 1<= instructions.month && instructions.month <= 12 && 1<= instructions.date && instructions.date <= 31 && instructions.message.isBlank()
            )}
        else {
            fail("callInstructionsApi_withExistingId(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
        var failure =""
        instructionRemoteRepoPreExam.callInstructionsApi(token,"123456")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withNotExistingId(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withNotExistingId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withNotExistingId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withNotExistingId(): Verification Failed as received $failure", "Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withSpecialCharId() {
        var failure = ""
        instructionRemoteRepoPreExam.callInstructionsApi(token,"@#%$^&")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withSpecialCharId(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withSpecialCharId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withSpecialCharId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withSpecialCharId(): Verification Failed as received $failure", "Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withNullId() {
        var failure = ""
        instructionRemoteRepoPreExam.callInstructionsApi(token,"")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withNullId(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withNullId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withNullId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withNullId(): Verification Failed as received $failure", "Unauthorized access", failure)
        }
    }

    @Test
    fun callInstructionsApi_withSpaceAsId() {
        var failure = ""
        instructionRemoteRepoPreExam.callInstructionsApi(token," ")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withSpaceAsId(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withSpaceAsId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        }
                )

        if (failure.isBlank()){
            fail("callInstructionsApi_withSpaceAsId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withSpaceAsId(): Verification Failed as received $failure}", "Please provide a valid id", failure)
        }
    }

    @Test
    fun callInstructionsApi_withBlankToken() {
        var failure = ""
        instructionRemoteRepoPreExam.callInstructionsApi("","12345")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withBlankToken(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withBlankToken(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withBlankToken(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withBlankToken(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callInstructionsApi_withInvalidTokenNId() {
        var failure = ""
        instructionRemoteRepoPreExam.callInstructionsApi("","12345")
                .handelNetworkError()
                .subscribe(
                        {success -> Log.i(TAG,"callInstructionsApi_withInvalidTokenNId(): Instruction is $success")
                        },
                        { error -> Log.e(TAG,"callInstructionsApi_withInvalidTokenNId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()){
            fail("callInstructionsApi_withInvalidTokenNId(): Verification failed as received Instructions")
        }
        else {
            assertEquals("callInstructionsApi_withInvalidTokenNId(): Verification Failed as received $failure", "Access denied", failure)
        }
    }
}