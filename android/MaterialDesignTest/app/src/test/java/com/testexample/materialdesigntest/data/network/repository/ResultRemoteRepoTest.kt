package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.IPlatformLog
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.SystemPlatformLog
import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.model.CollegeWiseResultResponse
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.ClassRule
import org.junit.Test

class ResultRemoteRepoTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    private val Log: IPlatformLog = SystemPlatformLog()

    val TAG = "Testing ResultRemoteRepo"
    lateinit var resultRemoteRepo: IResultRemoteRepo
    lateinit var token: String
    lateinit var tokenRepository: UserRemoteRepositoryTest

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken().token
        resultRemoteRepo = ResultRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callApiForStudentResultList_withValidTokenCodeQuesId() {
        var response = CollegeWiseResultResponse("", "", "", 0, 0, 0.0)
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(token, 2346, "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForStudentResultList_withValidTokenCodeRollQuesId(): Result is $success")
                    response = success[0]
                },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withValidTokenCodeRollQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertFalse("callApiForStudentResult_withValidParams(): Received Invalid Result values",
                response.studentRollNo.isBlank() && response.studentName.isNullOrBlank() && response.questionAttended < 0 && response.correctAttempted < 0)
        } else {
            fail("callApiForStudentResultList_withValidTokenCodeRollQuesId(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidTokenAsSpace() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList("", 2346, "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidTokenAsSpace(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidTokenAsSpace(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidTokenAsSpace(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withInvalidTokenAsSpace(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidTokenNCode() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList("12345", 803, "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidTokenNCode(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidTokenNCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidTokenNCode(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withInvalidTokenNCode(): Verification Failed as received $failure", "server not found", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidTokenNQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList("123456", 2346, "12345")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidTokenNQuesId(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidTokenNQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidTokenNQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withInvalidTokenNQuesId(): Verification Failed as received $failure", "server not found", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidTokenNQuesIdNCode() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(" ", 803, "123456")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidTokenNQuesIdNCode(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidTokenNQuesIdNCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidTokenNQuesIdNCode(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withInvalidTokenNQuesIdNCode(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidCode() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(token, 803, "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidCode(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidCode(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withInvalidCode(): Verification Failed as received $failure", "Please provide a valid id or code", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidCodeNQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(token, 803, "5ee20f9d6d28624f1c6470a888888")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidCodeNQuesId(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidCodeNQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidCodeNQuesId(): Verification Failed! as received Result")
        } else {//Testing ResultRemoteRepo : callApiForStudentResultList_withInvalidCodeNQuesId(): 700 Cast to ObjectId failed for value "5ee20f9d6d28624f1c6470a888888" at path "question_paper_id" for model "Result"

            assertEquals("callApiForStudentResultList_withInvalidCodeNQuesId(): Verification Failed as received $failure", "Please provide a valid id or code", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withInvalidQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(token, 2346, "5ee20f9d6d28624f1c6470a8888888")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withInvalidQuesId(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withInvalidQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withInvalidQuesId(): Verification Failed! as received Result")
        } else {

            assertEquals("callApiForStudentResultList_withInvalidQuesId(): Verification Failed as received $failure", "Please provide a valid id or code", failure)
        }
    }

    @Test
    fun callApiForStudentResultList_withSpecQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResultList(token, 2346, "@#$%^")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForStudentResultList_withSpecQuesId(): Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResultList_withSpecQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResultList_withSpecQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResultList_withSpecQuesId(): Verification Failed as received $failure", "Please provide a valid id or code", failure)
        }
    }

    //test cases for callApiForResultWithStudentId:

    @Test
    fun callApiForStudentResult_withValidParams() {
        var failure = ""
        var response = Result("", "","", "", 0, 0, 0, 0, 0.0)
        resultRemoteRepo.callApiForStudentResult(token, 2346, "1680210025", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                            response = success
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidParams(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertFalse("callApiForStudentResult_withValidParams(): Received Invalid Result values",
                response.studentRollNo.isBlank() && response.studentName.isBlank()  && response.questionPaperId.isBlank() && response.noOfQuestionsAttempted < 0 && response.noOfQuestionsCorrect < 0)
        } else {
            fail("callApiForStudentResult_withInvalidParams(): Verification Failed! as not received Result")
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidTokenAsSpace() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(" ", 2346, "1680210676", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.i(TAG, "callApiForStudentResultList_withValidTokenCodeRollQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidTokenAsSpace(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidTokenAsSpace(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidTokenNQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(" ", 2346, "1680210676", "1234567890")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidTokenNQuesId(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidTokenNQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidTokenNQuesId(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidTokenNQuesIdNCode() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(" ", 1234, "1680210676", "1234567890")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidTokenNQuesIdNCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidTokenNQuesIdNCode(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidTokenNQuesIdNCode(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidParams() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(" ", 1234, "12345678", "1234567890")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidParams(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidParams(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidParams(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidCode() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 803, "1680210676", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidCode(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidCode(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidCodeNQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 0, "1680210676", "1234567890")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })
        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidCodeNQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidCodeNQuesId(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, "1680210676", "5ee20f9d6d28624f1c6470a88888")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withInvalidQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withInvalidQuesId(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure) }
    }

    @Test
    fun callApiForStudentResult_withSpecQuesId() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, "1680210676", "#$%^&*")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withSpecQuesId(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withSpecQuesId(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withSpecRoll() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, "#$%^&*", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withSpecRoll(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withSpecRoll(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withBlankRoll() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, "2346", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withSpecRoll(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withSpecRoll(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withSpaceRoll() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, " ", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withSpecRoll(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withSpecRoll(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }

    @Test
    fun callApiForStudentResult_withInvalidRoll() {
        var failure = ""
        resultRemoteRepo.callApiForStudentResult(token, 2346, " ", "5eeb257218b0eeb44966b3ca")
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "Result is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForStudentResult_withInvalidRoll(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForStudentResult_withSpecRoll(): Verification Failed! as received Result")
        } else {
            assertEquals("callApiForStudentResult_withSpecRoll(): Verification Failed as received $failure", "Please provide a valid code/id/roll no", failure)
        }
    }
}