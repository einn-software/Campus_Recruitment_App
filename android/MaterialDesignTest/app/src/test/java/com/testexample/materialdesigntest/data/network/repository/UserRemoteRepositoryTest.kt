package com.testexample.materialdesigntest.data.network.repository

import android.content.Context
import android.util.Log
import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.Observable
import io.reactivex.Scheduler
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.observers.TestObserver
import io.reactivex.schedulers.Schedulers
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.junit.ClassRule
import org.mockito.Mockito
import retrofit2.HttpException

class UserRemoteRepositoryTest {
    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }

    lateinit var repository: IUserRemoteRepository
    val  TAG = "Testing UserRemoteRepository"

    @Before
    fun setUp() {
        repository = UserRemoteRepository()
    }

    @After
    fun tearDown() {

    }

    fun setToken(): String{
        setUp()
        var token = ""
        repository.authStudent(123456789, "15787851")
            .subscribe(
                {success -> token = success
                    println("token is $token")},
                { error -> println(error.localizedMessage) })

        return token
    }

    private fun setToken(email: String, password: String): String {
        setUp()
        var token = ""
        repository.authCollege(email, password)
            .subscribe(
                {success -> token = success},
                {err -> println(err.localizedMessage)})
        return token
    }


    @Test
    fun authStudentTest() {
        var token: String = ""
         repository.authStudent(123456789, "15787851")
            .subscribe(
                {success -> token = success
                println("token is $token")},
                { error -> println(error.localizedMessage) })

        assertNotNull(token)
    }

    @Test
    fun getStudentTest() {
        var student: Student
        val token = setToken()
        val output = repository.getStudent(token)
        assertEquals(true, output.blockingSubscribe(
            {it ->
                it.studentName
                print(it)
            },
            {})
            .toString().isNotEmpty())


    }


    @Test
    fun `when unregistered student roll number is supplied for login`() {
        val output = repository.authStudent(12456789,"15787851")
        var err: String = "none"
        output.subscribe({ println("success")},{err = it.localizedMessage!!})

        assertEquals("Invalid Roll Number", err)

    }

    @Test
    fun `when wrong password is supplied for login`() {
        val output = repository.authStudent(123456789,"187851")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Password", err)

    }

    @Test
    fun `when no roll number is supplied for login`() {
        val output = repository.authStudent(0,"187851")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Roll Number is not supplied", err)

    }

    @Test
    fun `when password is not supplied for login`() {
        val output = repository.authStudent(123456789,"")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Password is not supplied", err)

    }

    @Test
    fun `when neither roll number nor password is supplied for login`() {
        val output = repository.authStudent(0,"")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Roll Number is not supplied", err)

    }

    @Test
    fun getCollegeTest() {
        val token = setToken("xz.d@gg.com", "15787851")
        val output = repository.getCollege(token)
        assertEquals(true, output.blockingSubscribe(
            {it ->
                it.collegeName
                print(it)
            },
            {})
            .toString().isNotEmpty())
    }

    @Test
    fun authCollegeTest() {
        var token: String = ""
        repository.authCollege("xz.d@gg.com", "15787851")
            .subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(
                {success -> token = success
                    println("token is $token")},
                { error -> println(error.localizedMessage) })

        assertNotNull(token)
    }

    @Test
    fun `when unregistered email is supplied for college login`() {
        val output = repository.authCollege("xyz@abc.com","15787851")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Email ", err)
    }

    @Test
    fun `when Wrong Password supplied for college login`() {
        val output = repository.authCollege("xz.d@gg.com","157878")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Password ", err)
    }

    @Test
    fun `when neither Email nor Password is supplied for college login`() {
        val output = repository.authCollege("","")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("No Email Supplied ", err)
    }

    @Test
    fun `when email is not supplied for login`() {
        val output = repository.authCollege("xyz@abc.com","15787851")
        var err: String = "none"
        output.subscribe(
            { println("success")},
            {err = it.localizedMessage!!})

        assertEquals("Invalid Email ", err)
    }

}