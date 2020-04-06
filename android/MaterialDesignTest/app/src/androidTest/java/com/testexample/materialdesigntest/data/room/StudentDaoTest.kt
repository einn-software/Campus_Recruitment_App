package com.testexample.materialdesigntest.data.room

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.testexample.materialdesigntest.data.database.model.Student
import io.mockk.mockk
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(maxSdk = 28)
class StudentDaoTest {
    private val user =
        Student(
            1, "sdg", "sdg@test.com",
            "qwertyui", 545454545, 243,
            "cse", "nitra"
        )

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule() // for executing tasks synchronously

    private  lateinit var studentDao: StudentDao    // DOA
    private  lateinit var database: StudentDatabase  // database instance

    @Before
    fun setUp() {
        database = mockk()
        studentDao = database.studentDAO()
    }

    @Test
    fun `my_doa_was_called`(){

    }

}