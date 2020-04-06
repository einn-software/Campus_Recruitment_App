package com.testexample.materialdesigntest.data.repository

import com.testexample.materialdesigntest.data.room.StudentDao
import io.mockk.mockk
import io.reactivex.Observable
import io.reactivex.Single
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*

class RoomRepositoryTest {

    private var studentDao: StudentDao = mockk(relaxed = true)
    private var roomRepository = RoomRepository(studentDao)

    @Before
    fun setUp() {
    }

    @After
    fun tearDown() {
    }

    @Test
    fun isUserValid() {
        val user = "test.test@test.com"
        val pass = "qwertyui"
        val expected = Single.just(true)
        var output: Single<Boolean>

        output = roomRepository.isUserValid(user,pass)

        assertEquals(output,expected)
    }

    @Test
    fun isExistingUser() {


    }

    @Test
    fun getUser() {
    }
}