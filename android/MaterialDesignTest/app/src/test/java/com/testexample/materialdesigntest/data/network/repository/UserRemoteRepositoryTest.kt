package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.CollegeLoginRequest
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.junit.ClassRule

class UserRemoteRepositoryTest {
//    companion object {
//        @ClassRule
//        @JvmField
//        val schedulers = RxImmediateSchedulerRule()
//    }

    private lateinit var repository: IUserRemoteRepository
    private val validCollegeLoginRequest = CollegeLoginRequest("anand@gmail.com","anand344")
    private val validStudentLoginRequest = StudentLoginRequest("1680210044",2346, "ria2611")

    @Before
    fun setUp() {
        repository = UserRemoteRepository()

    }

    @After
    fun tearDown() {

    }

    fun setToken(): UserRequest{
        setUp()
        var getUserRequest = UserRequest("","")
        repository.authStudent(validStudentLoginRequest)
            .handelNetworkError()
            .subscribe(
                {success ->
                    getUserRequest = UserRequest(success.token, success.id)
                },
                { error -> println(error.localizedMessage) })

        return getUserRequest
    }

    private fun setToken(request: CollegeLoginRequest): UserRequest {
        setUp()
        var getUserRequest = UserRequest("","")
        repository.authTPO(request)
            .handelNetworkError()
            .subscribe(
                {success ->
                    getUserRequest = UserRequest(success.token, success.id)
                },
                { error -> println(error.localizedMessage) })

        return getUserRequest
    }


    @Test
    fun authStudentTest() {
        var getUserRequest = UserRequest("","")
         repository.authStudent(validStudentLoginRequest)
             .handelNetworkError()
             .subscribe(
                {success ->
                    getUserRequest = UserRequest(success.token, success.id)
                    println("Auth Response is $success")},
                { error ->
                    println(error.localizedMessage) })


        assertNotNull(getUserRequest.id)
        assertNotNull(getUserRequest.token)
    }

    @Test
    fun getStudentTest() {
        var student: Student
        val getUserRequest = setToken()
        println(getUserRequest)
        val output = repository.getStudent(getUserRequest)
        output.test().assertNoErrors()
        output
            .handelNetworkError()
            .doOnNext{
            println(it)
            assertEquals(it.studentRollNo,validStudentLoginRequest.rollNo)
            assertEquals(it.studentCollegeCode, validStudentLoginRequest.code)
        }
    }


    @Test
    fun `when unregistered student roll number is supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest("168021067",
                validStudentLoginRequest.code, validStudentLoginRequest.password))
        var err: String = "none"
        output
            .handelNetworkError()
            .subscribe(
                { println("success")},
                {err = it.localizedMessage!!
                println(err)})

        assertEquals("704 Roll no. or code not found, Please register yourself", err)

    }

    @Test
    fun `when wrong password is supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest(validStudentLoginRequest.rollNo,
                validStudentLoginRequest.code, "1587851"))
        var err: String = "none"
        output
            .handelNetworkError()
            .subscribe (
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("701 Invalid password, please try again", err)

    }


    @Test
    fun `when no roll number is supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest("",
                validStudentLoginRequest.code, validStudentLoginRequest.password))
        var err = "none"
        output
            .handelNetworkError()
            .subscribe(
            { println("success")},
            {err = it.localizedMessage!!
            println(it.message)})

        assertEquals("700 \"roll\" is not allowed to be empty", err)

    }

    @Test
    fun `when password is not supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest(validStudentLoginRequest.rollNo,
                validStudentLoginRequest.code, ""))
        var err = "none"
        output
            .handelNetworkError()
            .subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("700 \"password\" is not allowed to be empty", err)

    }

    @Test
    fun `when neither roll number nor password is supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest("",validStudentLoginRequest.code,""))
        var err = "none"
        output
            .handelNetworkError()
            .subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("700 \"roll\" is not allowed to be empty", err)

    }

    @Test
    fun getTPOTest() {
        val getUserRequest = setToken(validCollegeLoginRequest)
        println(getUserRequest)
        val output = repository.getTPO(getUserRequest).handelNetworkError()
        output.test().assertNoErrors()
        output
            .subscribe(
                {
                    println("The TPO information is $it")
                    assertEquals(it.TPOEmail, validCollegeLoginRequest.email)
                },
                {
                    println(it.localizedMessage)
                })
    }

    @Test
    fun authTPOTest() {
        var getUserRequest = UserRequest("","")
        val output = repository
            .authTPO(validCollegeLoginRequest).handelNetworkError()
        output.test().assertNoErrors()
        output.subscribe(
                {success -> getUserRequest = UserRequest(success.token, success.id)
                    println("Auth Response is $success")},
                { error ->
                    fail("Verification failed with message ${error.localizedMessage}")
                })

        assertNotNull(getUserRequest.token)
        assertNotNull(getUserRequest.id)
    }

    @Test
    fun `when unregistered email is supplied for college login`() {
        val output = repository
            .authTPO(CollegeLoginRequest("xyz@abc.com",
                validCollegeLoginRequest.password)).handelNetworkError()
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("704 Email not found, Please register yourself", err)
    }

    @Test
    fun `when Wrong Password supplied for college login`() {
        val output = repository
            .authTPO(CollegeLoginRequest(validCollegeLoginRequest.email,"157851"))
            .handelNetworkError()
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("701 Invalid password, please try again", err)
    }

    @Test
    fun `when neither Email nor Password is supplied for college login`() {
        val output = repository
            .authTPO(CollegeLoginRequest("",""))
            .handelNetworkError()
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("700 \"email\" is not allowed to be empty", err)
    }

    @Test
    fun `when email is not supplied for login`() {
        val output = repository
            .authTPO(CollegeLoginRequest("",validCollegeLoginRequest.password))
            .handelNetworkError()
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("700 \"email\" is not allowed to be empty", err)
    }

}