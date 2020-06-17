package com.testexample.materialdesigntest.ui.resetAuthentication

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import org.junit.After
import org.junit.Assert.assertNotNull
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class ResetAuthenticationActivityTest {
    @Rule
    @JvmField
    var mActivityRule: ActivityTestRule<ResetAuthenticationActivity> =
        ActivityTestRule(ResetAuthenticationActivity::class.java)

    private lateinit var presenter: ResetAuthenticationContract.Presenter
    private lateinit var view: ResetAuthenticationContract.View
    @Before
    fun setUp() {
        view = mActivityRule.activity
        presenter = ResetAuthenticationPresenter(view)
    }

    @After
    fun tearDown() {
    }

    @Test
    fun activity_is_present(){
        assertNotNull("ResetAuthenticationActivity is null", view)
    }
}