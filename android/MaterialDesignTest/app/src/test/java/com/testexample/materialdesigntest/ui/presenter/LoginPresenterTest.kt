package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.RxImmediateSchedulerRule
import com.testexample.materialdesigntest.data.interactor.implementation.UserRepository
import com.testexample.materialdesigntest.ui.login.LoginContract
import com.testexample.materialdesigntest.ui.login.LoginPresenter
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import io.reactivex.Flowable
import org.junit.Before
import org.junit.ClassRule
import org.junit.Test

class LoginPresenterTest {

    companion object {
        @ClassRule
        @JvmField
        val schedulers = RxImmediateSchedulerRule()
    }


    //mock setup
    private val view : LoginContract.View = mockk(relaxed = true)
    private val model : UserRepository = mockk() {
        every { isUserValid("testuser", "testpass") } returns Flowable.just(true)
    }

    //init presenter object
    private lateinit var presenter: LoginPresenter
    @Before
    fun setUp() {

        presenter = LoginPresenter(view, model)
    }

    @Test
    fun `To test the login process in presenter`() {
        val user : String = "testuser"
        val pass : String = "testpass"
        val expected : String = "success"

        presenter.onLogin(user, pass)



        //checks to see whether the function is called
        verify(exactly = 1) {

            model.isUserValid(user, pass)
            view.onLoginResult(expected)
        }
    }

    @Test
    fun `To test the model call process in presenter`() {
        val user: String = "testuser"
        val pass: String = "testpass"

        model.isUserValid(user, pass).test().assertValue(true)

    }

    @Test
    fun onDestroy() {
    }
}