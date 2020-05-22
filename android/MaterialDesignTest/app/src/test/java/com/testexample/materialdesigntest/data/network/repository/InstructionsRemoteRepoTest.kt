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
        val response = instructionRemoteRepo.callInstructionsApi(token,"1234")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("Verification for Id is Failed: Id is Null",success.id.isBlank())
                    assertTrue("Verification for CollegeCode is Failed: CollegeCode is Null",success.collegeCode.isBlank())
                    assertTrue("Verification for Year is Failed: Year is Null",success.year.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.month.isBlank())
                    assertTrue("Verification for Day is Failed: Day is Null",success.day.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.message.isBlank())
                    assertTrue("Verification for Version is Failed: Version is Null",success.version != 0)
                },
            { error -> println(error.localizedMessage)
                assertTrue("Verification for Id is Failed: Id is Null",error.message == "HTTP Bad Request")})

    }

    @Test
    fun callInstructionsApi_withNotExistingId() {
        instructionRemoteRepo.callInstructionsApi(token,"abcde")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("Verification for Id is Failed: Id is Null",success.id.isBlank())
                    assertTrue("Verification for CollegeCode is Failed: CollegeCode is Null",success.collegeCode.isBlank())
                    assertTrue("Verification for Year is Failed: Year is Null",success.year.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.month.isBlank())
                    assertTrue("Verification for Day is Failed: Day is Null",success.day.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.message.isBlank())
                    assertTrue("Verification for Version is Failed: Version is Null",success.version != 0)
                },
                { error -> println(error.localizedMessage)
                assertTrue("Ver")})
    }

    @Test
    fun callInstructionsApi_withSpecialCharId() {
        instructionRemoteRepo.callInstructionsApi(token,"@#%$^&")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("Verification for Id is Failed: Id is Null",success.id.isBlank())
                    assertTrue("Verification for CollegeCode is Failed: CollegeCode is Null",success.collegeCode.isBlank())
                    assertTrue("Verification for Year is Failed: Year is Null",success.year.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.month.isBlank())
                    assertTrue("Verification for Day is Failed: Day is Null",success.day.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.message.isBlank())
                    assertTrue("Verification for Version is Failed: Version is Null",success.version != 0)
                },
                { error -> println(error.localizedMessage) })
    }

    @Test
    fun callInstructionsApi_withNullId() {
        instructionRemoteRepo.callInstructionsApi(token,"")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("Verification for Id is Failed: Id is Null",success.id.isBlank())
                    assertTrue("Verification for CollegeCode is Failed: CollegeCode is Null",success.collegeCode.isBlank())
                    assertTrue("Verification for Year is Failed: Year is Null",success.year.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.month.isBlank())
                    assertTrue("Verification for Day is Failed: Day is Null",success.day.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.message.isBlank())
                    assertTrue("Verification for Version is Failed: Version is Null",success.version != 0)
                },
                { error -> println(error.localizedMessage) })
    }

    @Test
    fun callInstructionsApi_withSpaceAsId() {
        instructionRemoteRepo.callInstructionsApi(token," ")
            .subscribe(
                {success -> println("Instruction is $success")
                    assertTrue("Verification for Id is Failed: Id is Null",success.id.isBlank())
                    assertTrue("Verification for CollegeCode is Failed: CollegeCode is Null",success.collegeCode.isBlank())
                    assertTrue("Verification for Year is Failed: Year is Null",success.year.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.month.isBlank())
                    assertTrue("Verification for Day is Failed: Day is Null",success.day.isBlank())
                    assertTrue("Verification for Month is Failed: Month is Null",success.message.isBlank())
                    assertTrue("Verification for Version is Failed: Version is Null",success.version != 0)
                    },
                { error -> println(error.localizedMessage) })
    }
}