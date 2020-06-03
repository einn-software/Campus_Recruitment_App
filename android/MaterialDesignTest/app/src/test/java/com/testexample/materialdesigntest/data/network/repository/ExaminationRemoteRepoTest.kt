package com.testexample.materialdesigntest.data.network.repository

import com.google.android.gms.common.api.ApiException
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.network.model.*
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.ClassRule
import org.junit.Test

class ExaminationRemoteRepoTest {

    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    private lateinit var studentSession : UserRequest
    private lateinit var tokenRepository: UserRemoteRepositoryTest
    private lateinit var fetchExamRequest: FetchExamRequest
    private val repository = ExaminationRemoteRepo()
    private var questionId: String = "none"
    private lateinit var answer: StudentAnswerRequest
    private lateinit var updateAnswer: StudentAnswerResponse
    private var questionPaperId = "none"

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        studentSession = tokenRepository.setToken()
        fetchExamRequest = FetchExamRequest(802,2020,5,29)
        answer = StudentAnswerRequest(studentSession.id,"none",0,"none",0)
        updateAnswer = StudentAnswerResponse("none", answer)
    }

    @After
    fun tearDown() {
    }

    @Test
    fun callApiForQuestionPaperTest() {

        val output = repository
            .callApiForQuestionPaper(studentSession.token,fetchExamRequest)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println(" Result is $success")
                assertEquals(success.questionPaper.collegeCode, fetchExamRequest.code)
                assertEquals(success.questionPaper.date, fetchExamRequest.date)
                assertEquals(success.questionPaper.month,fetchExamRequest.month)
                assertEquals(success.questionPaper.year,fetchExamRequest.year)
                assertTrue(success.sections.count() > 0)
                assertTrue(success.sections[0].questionIdList.count() > 0)
                questionId = success.sections[0].questionIdList[0]
                questionPaperId = success.questionPaper.questionPaperId
            },
            {err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            })


    }

    @Test
    fun `call Api For QuestionPaper when wrong token is passed`(){
        val output = repository
            .callApiForQuestionPaper(studentSession.token,fetchExamRequest)
            .handelNetworkError()

        output.subscribe(
            {success -> fail("Verification failed because successful event recorded $success")},
            {err ->
                assertEquals("Unauthorised user",err.localizedMessage)
            }
        )

    }


    @Test
    fun callApiForQuestionTest() {
        val output = repository
            .callApiForQuestion(studentSession.token, questionId)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("question is $success")
                assertEquals(success.questionId, questionId)
                assertTrue(success.questionText.isNotEmpty())
                assertTrue(success.option.count() > 0)
            },
            {err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            })
    }

    @Test
    fun callApiForSavingAnswerTest() {
        answer = StudentAnswerRequest(studentSession.id,
            questionId, 3, questionPaperId, 1)
        val output = repository.callApiForSavingAnswer(answer)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("Answer Submitted is $success")
                assertTrue(success.id != "")
                assertEquals(success.studentAnswer, answer)
                updateAnswer = StudentAnswerResponse(success.id,success.studentAnswer)
            },
            {err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            }
        )
    }

    @Test
    fun callApiForUpdatingAnswerTest() {

        val output = repository.callApiForUpdatingAnswer(updateAnswer)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("Answer Submitted is $success")
                assertEquals(success.studentAnswer, answer)
            },
            { err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            }
        )
    }

    @Test
    fun callApiForEndingExam() {
        val output = repository
            .callApiForEndingExam(EndExamRequest(studentSession.id,
                questionPaperId)).handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println(success.message)
                assertEquals(success.status, 200 )
            },
            {err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            }
        )
    }

}