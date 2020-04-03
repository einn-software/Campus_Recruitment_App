package com.testexample.materialdesigntest.data.room

import android.content.Context
import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import androidx.test.platform.app.InstrumentationRegistry
import com.testexample.materialdesigntest.data.database.Student
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import java.io.IOException

@RunWith(RobolectricTestRunner::class)
@Config(maxSdk = 28)
class StudentDatabaseTest {

    private val user = Student(1,"sdg", "sdg@test.com",
        "qwertyui", 545454545, 243,
        "cse", "nitra")

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule() // for executing tasks synchronously

    private  lateinit var studentDao: StudentDao    // DOA
    private  lateinit var database: StudentDatabase  // database instance

    @Before
    fun setUp() {
        val context = ApplicationProvider.getApplicationContext<Context>()

        database = Room.inMemoryDatabaseBuilder(context, StudentDatabase::class.java)
            .allowMainThreadQueries()       //only for testing
            .build()
        studentDao = database.studentDAO()
    }

    @After
    @Throws(IOException::class)
    fun tearDown() {
        database.close()
    }

    @Test
    @Throws(Exception::class)
    fun test_for_checking_insertion_when_user_is_given() {

        //insert
        studentDao.insertUser(user).blockingGet() // wait until inserted


        // getAllUsers must be annotated as @VisibleForTesting in DAO for accessing test()
        studentDao.getAllUsers().test().assertValue { list ->
            list.isEmpty()
        }
    }

    @Test
    @Throws(Exception::class)
    fun test_for_fetching_user_when_email_and_password_given() {

        studentDao.getUserByEmailPassword(
            user.studentEmail.toString(),
            user.studentPassword)
            .test()
            .assertValue {  gotUser ->
                return@assertValue gotUser.studentId == user.studentId &&
                        gotUser.studentName == user.studentName
            }



    }
}