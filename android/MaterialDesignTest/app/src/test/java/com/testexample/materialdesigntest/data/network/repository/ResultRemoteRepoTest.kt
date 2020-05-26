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

    val tag = "Testing ResultRemoteRepo"
    private lateinit var resultRemoteRepo: IResultRemoteRepo
    private lateinit var token : String
    private lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken()
        resultRemoteRepo = ResultRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callApiForResultWithQuesId_withValidTokenCodeQuesId() {
        var response : String
        resultRemoteRepo.callApiForResultWithQuesId(token, 802, "12345")
            .subscribe( { success -> println("Result is $success")
                if(success[0].code < 2000 && success[0].total_marks < 0 && success[0].total_marks_scored > success[0].total_marks && success[0].question_attempt < 0 && success[0].question_attempt > success[0].total_question && success[0].correct_attempt > success[0].total_question) {
                    fail("callApiForResultWithQuesId_withValidTokenCodeQuesId(): Verification Failed! Invalid values ")
                }
            },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                    assertEquals("callApiForResultWithQuesId_withInvalidTokenAsSpace(): Verification Failed!","HTTP 200 OK",response)
                })
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidTokenAsSpace() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 802, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidTokenAsSpace(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidTokenAsSpace(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidTokenNCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidTokenNCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidTokenNCode(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidTokenNQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidTokenNQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidTokenNQuesId(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidTokenNQuesIdNCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidTokenNQuesIdNCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidTokenNQuesIdNCode(): Verification Failed!","HTTP 401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidCode(): Verification Failed!","HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidCodeNQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 0, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidCodeNQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidCodeNQuesId(): Verification Failed!", "HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithQuesId_withInvalidQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 802, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withInvalidQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withInvalidQuesId(): Verification Failed!","HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithQuesId_withSpecQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 802, "@#$%^")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithQuesId_withSpecQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithQuesId_withSpecQuesId(): Verification Failed!","HTTP 404 Not Found",response)
    }

    // test cases for callApiForResultWithStudentId:

    @Test
    fun callApiForResultWithStudentId_withInvalidTokenAsSpace() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 802, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidTokenAsSpace(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidTokenAsSpace(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidTokenNCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidTokenNCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidTokenNCode(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidTokenNQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidTokenNQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidTokenNQuesId(): Verification Failed!","401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidTokenNQuesIdNCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(" ", 0, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidTokenNQuesIdNCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidTokenNQuesIdNCode(): Verification Failed!","HTTP 401 Unauthorized Error",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidCode() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 0, "12345")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidCode(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidCode(): Verification Failed!","HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidCodeNQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 0, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidCodeNQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidCodeNQuesId(): Verification Failed!","HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithStudentId_withInvalidQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 802, " ")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withInvalidQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withInvalidQuesId(): Verification Failed!","HTTP 404 Not Found",response)
    }

    @Test
    fun callApiForResultWithStudentId_withSpecQuesId() {
        var response = ""
        resultRemoteRepo.callApiForResultWithQuesId(token, 802, "@#$%^")
            .subscribe(
                {success -> println("Result is $success")
                    fail("callApiForResultWithStudentId_withSpecQuesId(): Verification Failed! It should not receive HTTP Status Code as 200 ")
                },
                { error -> println(error.localizedMessage)
                    response = error.message.toString()
                })
        assertEquals("callApiForResultWithStudentId_withSpecQuesId(): Verification Failed!","HTTP 404 Not Found",response)
    }
}