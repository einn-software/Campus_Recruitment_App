package com.innobitsystems.campusrecruiter.ui.presenter

import com.innobitsystems.campusrecruiter.RxImmediateSchedulerRule
import com.innobitsystems.campusrecruiter.data.interactor.implementation.UserRepository
import com.innobitsystems.campusrecruiter.data.network.model.AuthResponse
import com.innobitsystems.campusrecruiter.data.network.model.StudentLoginRequest
import com.innobitsystems.campusrecruiter.ui.login.LoginContract
import com.innobitsystems.campusrecruiter.ui.login.LoginPresenter
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import io.reactivex.Single
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
    private val model : UserRepository = mockk {
        every {
            isStudentValid(StudentLoginRequest("645454", 2454, "testpass"))
        } returns Single.just(AuthResponse("token","","",""
        ))
    }

    //init presenter object
    private lateinit var presenter: LoginPresenter
    @Before
    fun setUp() {

        presenter = LoginPresenter(view)
    }

    @Test
    fun `To test the login process in presenter`() {
        val user : String = "15545"
        val pass : String = "testpass"
        val code: Int  = 2454
        val expected : String = "success"

        presenter.onStudentLogin(StudentLoginRequest(user, code ,pass))



        //checks to see whether the function is called
        verify(exactly = 1) {

            model.isStudentValid(StudentLoginRequest(user,code,  pass))
        }
    }

    @Test
    fun `To test the model call process in presenter`() {
        val user: String = "1545"
        val pass: String = "testpass"
        val code: Int = 2454

        model.isStudentValid(StudentLoginRequest(user, code , pass)).test().assertValue(AuthResponse("token","","",""))

    }

    @Test
    fun onDestroy() {
    }
}