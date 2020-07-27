package com.innobitsystems.campusrecruiter

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.rule.ActivityTestRule
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith


/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class ExampleInstrumentedTest {
    @Rule
    @JvmField
    val rule: ActivityTestRule<LoginActivity> = ActivityTestRule(
        LoginActivity::class.java)

//    @Before
//    fun yourSetUPFragment() {
//        rule.activity.supportFragmentManager.beginTransaction().replace(R.id.loginFragment, LoginPrompt.newInstance()).commit()
//    }

    @Test
    fun useAppContext() {
        // Context of the app under test.
        val appContext = InstrumentationRegistry.getInstrumentation().targetContext
        assertEquals("com.testexample.materialdesigntest", appContext.packageName)
    }

    @Test
    fun user_hits_join_test_button(){
        onView(withId(R.id.joinTestButton)).perform(closeSoftKeyboard()).perform(click())
    }

    @Test
    fun student_can_input_credential() {
        user_hits_join_test_button()
        onView(withId(R.id.rollNoText)).perform(typeText("123456789"), closeSoftKeyboard())
        onView(withId(R.id.studentPasswordText)).perform(typeText("15787851"), closeSoftKeyboard())
        onView(withId(R.id.studentLoginButton)).perform(click())
    }

    @Test
    fun user_hits_login_button_after_entering_credential() {
        user_hits_join_test_button()
        onView(withId(R.id.studentLoginButton)).perform(click())

    }

}
