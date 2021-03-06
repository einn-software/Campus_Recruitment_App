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
    private var questionId: String = "5eeb257218b0eeb44966b3c5"
    private lateinit var answer: StudentAnswerRequest
    private lateinit var updateAnswer: StudentAnswerResponse
    private var questionPaperId = "5eeb257218b0eeb44966b3ca"

    @Before
    fun setUp() {
        tokenRepository = UserRemoteRepositoryTest()
        studentSession = tokenRepository.setToken()
        fetchExamRequest = FetchExamRequest(2346,2020,6,29)
        answer = StudentAnswerRequest(studentSession.id,questionId,2,questionPaperId,5,10)
        updateAnswer = StudentAnswerResponse("5eec8f5d32d95a2a1065eaca", answer)
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


            },
            {err ->
                println("Error log: " + err.localizedMessage)
            })
    }

    @Test
    fun `call Api For QuestionPaper when wrong token is passed`(){
        lateinit var err:String
        val output = repository
            .callApiForQuestionPaper("wrong", fetchExamRequest)
            .handelNetworkError()

        output.subscribe(
            {success -> fail("Verification failed because successful event recorded $success")},
            {
                err = it.localizedMessage!!
            }
        )
        assertEquals("Invalid Token", err)
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
        answer = StudentAnswerRequest(studentId = studentSession.id, questionId = questionId,
            selectedOption = 3, questionPaperId = questionPaperId,state =  5, questionMaxMarks = 5 )
        val output = repository.callApiForSavingAnswer(studentSession.token, answer)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("Answer Submitted is $success")
                assertTrue(success.id.isNotEmpty())
                assertEquals(success.questionId, answer.questionId)
            },
            {err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            }
        )
    }

    @Test
    fun callApiForUpdatingAnswerTest() {

        val output = repository.callApiForUpdatingAnswer(studentSession.token,updateAnswer)
            .handelNetworkError()

        output.test().assertNoErrors()
        output.subscribe(
            {success ->
                println("Answer Submitted is $success")
                assertEquals(success, updateAnswer)
            },
            { err ->
                println(err.localizedMessage)
                fail("Verification failed with message: ${err.message}")
            }
        )
    }

    @Test
    fun callApiForEndingExam() {
        println(studentSession.id +" : "+ questionPaperId + "    "+ studentSession.token)
        val output = repository
            .callApiForEndingExam(studentSession.token, EndExamRequest(questionPaperId =
            questionPaperId, studentId =  studentSession.id))
            .handelNetworkError()
        output.subscribe(
            {success ->
                println(success.message)
                assert(success.message.isBlank())
            },
            {err ->
                println(err.localizedMessage)
                if (err.localizedMessage != "You have already submitted the result for this exam"){
                    output.test().assertNoErrors()
                }
            }
        )
    }

}