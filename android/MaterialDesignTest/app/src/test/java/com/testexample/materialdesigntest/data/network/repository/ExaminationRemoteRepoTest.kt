package com.testexample.materialdesigntest.data.network.repository

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
        fetchExamRequest = FetchExamRequest(2346,2020,12,23)
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
        output.subscribe(
            {success ->
                println(" Result is $success \n")
                assertEquals(success.collegeCode, fetchExamRequest.code)
                assertEquals(success.date, fetchExamRequest.date)
                assertEquals(success.month,fetchExamRequest.month)
                assertEquals(success.year,fetchExamRequest.year)
                assertTrue(success.sections.count() > 0)
                assertTrue(success.sections[0].questionsList.count() > 0)
                questionId = success.sections[0].questionsList[0].questionId
                questionPaperId = success.questionPaperId
            },
            {err ->
                println("Error log: " + err.localizedMessage)

            })
        println(questionId)
    }

    @Test
    fun `call Api For QuestionPaper when wrong token is passed`(){
        lateinit var err:String
        val output = repository
            .callApiForQuestionPaper("none",fetchExamRequest)
            .handelNetworkError()

        output.subscribe(
            {success -> fail("Verification failed because successful event recorded $success")},
            {
                err = it.localizedMessage!!
            }
        )
        assertEquals("701 Invalid Token", err)
    }


    @Test
    fun callApiForQuestionTest() {
        callApiForQuestionPaperTest()
        println(questionId + "  " + studentSession.token)
        val output = repository
            .callApiForQuestion(studentSession.token, questionId)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("question is $success")
                assertEquals(success.questionId, questionId)
                assertTrue(success.questionText.isNotEmpty())
                assertTrue(success.options.count() > 0)
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