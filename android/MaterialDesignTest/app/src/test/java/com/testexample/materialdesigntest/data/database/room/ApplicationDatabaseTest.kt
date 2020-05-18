package com.testexample.materialdesigntest.data.database.room

//import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.room.Room
import androidx.test.platform.app.InstrumentationRegistry
import com.testexample.materialdesigntest.data.model.Student
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.junit.runners.JUnit4
import java.io.IOException

@RunWith(JUnit4::class)
//@Config(maxSdk = 28)
class ApplicationDatabaseTest {

    private val user =
        Student(
            "1", "sdg", "sdg@test.com",
            "qwertyui", 545454545, 243,
            "cse", "nitra","codes")

   // @get:Rule
    //val instantTaskExecutorRule = InstantTaskExecutorRule() // for executing tasks synchronously

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
        studentDao.getAllUsers().test().assertValue { list ->
            list.isEmpty()
        }
    }

    @Test
    @Throws(Exception::class)
    fun test_for_fetching_user_when_email_and_password_given() {

        studentDao.getUserByRollNoPassword(
            user.studentRollNo,
            user.studentPassword)
            .test()
            .assertValue {  gotUser ->
                return@assertValue gotUser.studentId == user.studentId &&
                        gotUser.studentName == user.studentName
            }



    }
}