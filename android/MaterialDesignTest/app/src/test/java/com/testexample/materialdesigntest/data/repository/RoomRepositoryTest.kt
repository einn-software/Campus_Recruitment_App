package com.testexample.materialdesigntest.data.repository

import com.testexample.materialdesigntest.data.database.model.Student
import com.testexample.materialdesigntest.data.room.StudentDao
import io.mockk.every
import io.mockk.mockk
import io.reactivex.Flowable
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*

class RoomRepositoryTest {
    private val user =
        Student(
            1, "sdg", "sdg@test.com",
            "qwertyui", 545454545, 243,
            "cse", "nitra"
        )


    private var studentDao: StudentDao = mockk(relaxed = true){
        every { getUserByEmailPassword(user.studentEmail.toString(), user.studentPassword) } returns Flowable.just(user)
        every { getUserByEmail(user.studentEmail.toString()) } returns user.studentEmail.toString()
    }
    private var roomRepository = RoomRepository(studentDao)

    @Before
    fun setUp() {
    }

    @After
    fun tearDown() {
    }



    @Test
    fun isExistingUser() {

        val expected = true
        val output = roomRepository.isExistingUser(user.studentEmail.toString())

        assertEquals(expected, output)


    }

    @Test
    fun getUser() {

        roomRepository
            .getUser(user.studentEmail.toString(), user.studentPassword)
            .test()
            .assertValue(user)
            .dispose()
    }
}