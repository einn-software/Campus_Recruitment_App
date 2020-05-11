package com.testexample.materialdesigntest.data.database.room

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.room.Room
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.testexample.materialdesigntest.data.model.Student
import io.reactivex.Flowable
import org.junit.After
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import java.io.IOException

@RunWith(AndroidJUnit4::class)
class ApplicationDatabaseITest {

    private val user =
        Student(
            "1", "sdg", "sdg@test.com",
            "qwertyui", 545454545, 243,
            "cse", "nitra","1545"
        )

    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule() // for executing tasks synchronously

    private  lateinit var studentDao: StudentDao    // DOA
    private  lateinit var database: ApplicationDatabase  // database instance

    @Before
    fun setUp() {
        val context = InstrumentationRegistry.getInstrumentation().targetContext

        database = Room.inMemoryDatabaseBuilder(context, ApplicationDatabase::class.java)
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
        val byEmail = studentDao.getUserByEmail("sdg@test.com")
        assert(byEmail == "sdg@test.com")
    }

    @Test
    @Throws(Exception::class)
    fun test_for_fetching_user_when_email_and_password_given() {

        val test= studentDao.getUserByEmailPassword(
            user.studentRollNo,
            user.studentPassword)
        assert(test == Flowable.just(user))

    }
}