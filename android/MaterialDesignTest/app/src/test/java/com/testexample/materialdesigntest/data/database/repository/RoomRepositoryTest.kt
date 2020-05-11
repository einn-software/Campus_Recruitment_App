package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.database.room.StudentDao
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
            "1", "sdg", "sdg@test.com",
            "qwertyui", 545454545, 243,
            "cse", "nitra","codes"
        )


    private var studentDao: StudentDao = mockk(relaxed = true){
        every { getUserByEmailPassword(user.studentRollNo, user.studentPassword) } returns Flowable.just(user)
        every { getUserByEmail(user.studentEmail.toString()) } returns user.studentEmail.toString()
    }
    private var roomRepository = UserRoomRepository(studentDao)

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
            .getUser(user.studentRollNo, user.studentPassword)
            .test()
            .assertValue(user)
            .dispose()
    }
}