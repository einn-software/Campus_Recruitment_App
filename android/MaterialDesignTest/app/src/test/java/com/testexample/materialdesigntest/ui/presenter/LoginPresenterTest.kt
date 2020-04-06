package com.testexample.materialdesigntest.ui.presenter

import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.ui.login.LoginContract
import com.testexample.materialdesigntest.ui.login.LoginPresenter
import io.mockk.clearAllMocks
import io.mockk.mockk
import io.mockk.verify
import org.junit.Before
import org.junit.Test

class LoginPresenterTest {

    //mock setup
    private val view : LoginContract.View = mockk()
    private val model : IUserRepository = mockk(relaxed = true)
    //init presenter object
    private val presenter : LoginPresenter =
        LoginPresenter(view)

    @Before
    fun setUp() {
        clearAllMocks()

        //every {  }
    }

    @Test
    fun `To test the login process in presenter`() {
        var userName : String = "testuser"
        var password : String = "testpass"
        val expected : String = "Welcome! "+userName
        var output :String

        presenter.onLogin(userName,  password).toString()

        //checks to see whether the function is called
        verify { model.isUserValid(userName, password)}
        verify {view.onLoginResult("Welcome! "+userName)   }
        //assertEquals(expected, output)
    }


    @Test
    fun onDestroy() {
    }
}