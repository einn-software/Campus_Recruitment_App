package com.testexample.materialdesigntest

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.testexample.materialdesigntest.ui.login.LoginActivity

import org.junit.Test
import org.junit.runner.RunWith

import org.junit.Assert.*
import org.junit.Rule

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

    @Test
    fun useAppContext() {
        // Context of the app under test.
        val appContext = InstrumentationRegistry.getInstrumentation().targetContext
        assertEquals("com.testexample.materialdesigntest", appContext.packageName)
    }

    @Test
    fun user_can_input_credential() {
        onView(withId(R.id.emailText)).perform(typeText("testuser@test.com"))
        onView(withId(R.id.passwordText)).perform(typeText("passwordis"))
    }

    @Test
    fun user_hits_login_button_after_entering_credential() {
        user_can_input_credential()
        onView(withId(R.id.loginButton)).perform(closeSoftKeyboard()).perform(click())
        onView(withId(R.id.loginMessage)).check(matches(withText("Welcome! testuser@test.com")))

    }

}
