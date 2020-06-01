package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.CollegeLoginRequest
import com.testexample.materialdesigntest.data.network.model.UserRequest
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
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
    private val validCollegeLoginRequest = CollegeLoginRequest("TestUSer@test.com","password")
    private val validStudentLoginRequest = StudentLoginRequest("1680210676",2346, "shikha2611")

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
            .subscribe(
                {success ->
                    getUserRequest = UserRequest(success.token, success.id)
                    println("Auth Response is $success")},
                { error -> println(error.localizedMessage) })

        return getUserRequest
    }

    private fun setToken(request: CollegeLoginRequest): UserRequest {
        setUp()
        var getUserRequest = UserRequest("","")
        repository.authTPO(request)
            .subscribe(
                {success ->
                    getUserRequest = UserRequest(success.token, success.id)
                    println("Auth Response is $success")},
                { error -> println(error.localizedMessage) })

        return getUserRequest
    }


    @Test
    fun authStudentTest() {
        var getUserRequest = UserRequest("","")
         repository.authStudent(validStudentLoginRequest)
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
        val output = repository.getStudent(getUserRequest)
        output.test().assertNoErrors()
        output.doOnNext{
            println(it)
            assertEquals(it.studentRollNo,validStudentLoginRequest.rollNo)
            assertEquals(it.studentCollegeCode, validStudentLoginRequest.code)
        }
    }


    @Test
    fun `when unregistered student roll number is supplied for login`() {
        val output = repository
            .authStudent(StudentLoginRequest("168021067",802,"15787851"))
        var err: String = "none"
        output.subscribe({ println("success")},{err = it.localizedMessage!!})

        assertEquals("Invalid Roll Number", err)

    }

    @Test
    fun `when wrong password is supplied for login`() {
        val output = repository.authStudent(StudentLoginRequest("1680210676",802,"1587851"))
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Password", err)

    }



    @Test
    fun `when no roll number is supplied for login`() {
        val output = repository.authStudent(StudentLoginRequest("",802,"15787851"))
        var err = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Roll Number is not supplied", err)

    }

    @Test
    fun `when password is not supplied for login`() {
        val output = repository.authStudent(StudentLoginRequest("1680210676",802,""))
        var err = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Password is not supplied", err)

    }

    @Test
    fun `when neither roll number nor password is supplied for login`() {
        val output = repository.authStudent(StudentLoginRequest("",802,""))
        var err = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Roll Number is not supplied", err)

    }

    @Test
    fun getTPOTest() {
        val getUserRequest = setToken(validCollegeLoginRequest)
        val output = repository.getTPO(getUserRequest)
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
        val output = repository.authTPO(validCollegeLoginRequest)
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
        val output = repository.authTPO(CollegeLoginRequest("xyz@abc.com","15787851"))
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Email ", err)
    }

    @Test
    fun `when Wrong Password supplied for college login`() {
        val output = repository.authTPO(CollegeLoginRequest("xyz@abc.com","157851"))
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Password ", err)
    }

    @Test
    fun `when neither Email nor Password is supplied for college login`() {
        val output = repository.authTPO(CollegeLoginRequest("",""))
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("No Email Supplied ", err)
    }

    @Test
    fun `when email is not supplied for login`() {
        val output = repository.authTPO(CollegeLoginRequest("","15787851"))
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Please Do Not leave Email blank ", err)
    }

}