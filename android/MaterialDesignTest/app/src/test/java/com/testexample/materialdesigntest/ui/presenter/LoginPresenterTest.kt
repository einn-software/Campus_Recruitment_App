package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.data.repository.UserRepository
import com.testexample.materialdesigntest.ui.login.LoginContract
import com.testexample.materialdesigntest.ui.login.LoginPresenter
import io.mockk.clearAllMocks
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import io.reactivex.Flowable
import org.junit.Before
import org.junit.Test

class LoginPresenterTest {

    //mock setup
    private val view : LoginContract.View = mockk()
    private val model : UserRepository = mockk() {
        every { isUserValid("testuser", "testpass") } returns Flowable.just(true)
    }

    //init presenter object
    private val presenter = LoginPresenter(view, model)
    @Before
    fun setUp() {

        //every {  }
    }

    @Test
    fun `To test the login process in presenter`() {
        val user : String = "testuser"
        val pass : String = "testpass"
        val expected : String = "success"
        presenter.onLogin(user,  pass)

        //checks to see whether the function is called
        verify { model.isUserValid(user, pass).test().assertValue(true)}
        verify {view.onLoginResult(expected)   }
        //assertEquals(expected, output)
    }


    @Test
    fun onDestroy() {
    }
}