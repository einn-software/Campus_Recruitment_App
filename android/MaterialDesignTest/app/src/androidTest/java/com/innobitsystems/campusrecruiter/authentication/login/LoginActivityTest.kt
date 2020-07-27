package com.innobitsystems.campusrecruiter.authentication.login

import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)

class LoginActivityTest {

    @Rule
    @JvmField
    val rule: ActivityTestRule<LoginActivity> = ActivityTestRule(
        LoginActivity::class.java
    )


    @Test
    fun user_clicks_join_test_button() {
        onView(withId(R.id.joinTestButton)).perform(click())
    }

    @Test
    fun user_can_input_credential() {
        user_clicks_join_test_button()
        onView(withId(R.id.rollNoText)).perform(typeText("testuser@test.com"))
        onView(withId(R.id.studentPasswordText)).perform(typeText("passwordis"))
    }

    @Test
    fun user_hits_login_button_after_entering_credential() {
        user_can_input_credential()
        onView(withId(R.id.loginButton)).perform(closeSoftKeyboard()).perform(click())
        onView(withId(R.id.loginMessage)).check(matches(withText("Welcome! testuser@test.com")))

    }
}