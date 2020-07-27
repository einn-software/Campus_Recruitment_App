package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.IPlatformLog
import com.innobitsystems.campusrecruiter.SystemPlatformLog
import com.innobitsystems.campusrecruiter.data.network.model.QuestionPaperListResponse
import com.innobitsystems.campusrecruiter.data.network.model.TpoLoginRequest
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

class QuestionPaperRemoteRepoTest {

    private val Log: IPlatformLog = SystemPlatformLog()

    val TAG = "Testing QuestionPaperRemoteRepoTest"
    lateinit var resultRemoteRepo: IQuestionPaperRemoteRepo
    lateinit var token: String
    lateinit var tokenRepository: UserRemoteRepositoryTest
    val code = 2346

    @Before
    fun setUp() {
        val validTpoLoginRequest = TpoLoginRequest("anand@gmail.com", "anand344")
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken(validTpoLoginRequest).token
        resultRemoteRepo = QuestionPaperRemoteRepo()
    }

    @After
    fun tearDown() {
    }


    @Test
    fun callApiForGetQuestionPaperList_withValidParams() {
        var response = QuestionPaperListResponse("",0,0,0,"")
        var failure = ""
        resultRemoteRepo.callApiForGetQuestionPaperList(token,code)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForGetQuestionPaperList_withValidParams(): Question Paper $success")
                    response = success[0]
                },
                        { error ->
                            Log.e(TAG, "callApiForGetQuestionPaperList_withValidParams(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertFalse("callApiForGetQuestionPaperList_withValidParams(): Received Invalid Invalid Question Paper List",response.questionPaperId.isBlank() && response.year < 2020 && response.month < 13 && response.month > 0 && response.day > 0 && response.day < 31 && response.paper_name.isBlank())
        } else {
            fail("callApiForGetQuestionPaperList_withValidParams(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForGetQuestionPaperList_withInvalidToken() {
        var failure = ""
        resultRemoteRepo.callApiForGetQuestionPaperList("",code)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForGetQuestionPaperList_withInvalidToken(): Question Paper is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForGetQuestionPaperList_withInvalidToken(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForGetQuestionPaperList_withInvalidToken(): Verification Failed! as received Question Paper List")
        } else {
            assertEquals("callApiForGetQuestionPaperList_withInvalidToken(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForGetQuestionPaperList_withInvalidCode() {
        var failure = ""
        resultRemoteRepo.callApiForGetQuestionPaperList(token,122)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForGetQuestionPaperList_withInvalidCode(): Question Paper is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForGetQuestionPaperList_withInvalidCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForGetQuestionPaperList_withInvalidCode(): Verification Failed! as received Question Paper List")
        } else {
            assertEquals("callApiForGetQuestionPaperList_withInvalidCode(): Verification Failed as received $failure", "Data of the url parameters or query is not a valid data, plese check it and try again", failure)
        }
    }
}