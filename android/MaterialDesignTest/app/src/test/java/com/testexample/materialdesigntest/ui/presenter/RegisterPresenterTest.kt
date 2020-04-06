package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.ui.register.RegisterContract
import com.testexample.materialdesigntest.ui.register.RegisterPresenter
import io.mockk.mockk
import org.junit.Before
import org.junit.Test

import org.junit.Assert.*

class RegisterPresenterTest {

    @Before
    fun setUp() {
    }

    @Test
    fun onRegister() {
    }

    @Test
    fun validateCredentials() {
        val username: String = ""
        val email = "adna@dk.com"
        val pass : String = "password12"
        val cPass : String = "password12"
        var output : String
        var expected : String = "valid user"

        // mock setup
        val view : RegisterContract.View = mockk(relaxed = true)

        val presenter: RegisterPresenter =
            RegisterPresenter(view)
        output = presenter.onRegister().toString()

        assertEquals(expected, output)
    }

    @Test
    fun onDestroy() {
    }
}