package com.testexample.materialdesigntest.data.database.repository

import android.content.Context
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.database.room.StudentDao
import io.mockk.every
import io.mockk.mockk
import io.reactivex.Flowable
import org.junit.After
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*
import org.mockito.Mockito.mock

class RoomRepositoryTest {

    private val context: Context = mock(Context::class.java)
    private val user =
        Student(
            "1", "sdg", "sdg@test.com",
            "qwertyui", 5184854,"45454",
            "cse", "nitra",2555 )


    private var studentDao: StudentDao = mockk(relaxed = true){
        every { getUserByRollNoPassword(user.studentRollNo, user.studentPassword) } returns Flowable.just(user)
        every { getUserByEmail(user.studentEmail.toString()) } returns user.studentEmail.toString()
    }
    private lateinit var roomRepository: IUserRoomRepository

    @Before
    private fun setUp() {
        roomRepository = UserRoomRepository(context)
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