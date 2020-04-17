package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment

import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.ui.examination.ExaminationActivity
import kotlinx.android.synthetic.main.fragment_student_login.*

/**
 * A simple [Fragment] subclass for student login
 */
class  StudentLogin : Fragment(R.layout.fragment_student_login), LoginContract.View{

    private lateinit var presenter: LoginContract.Presenter

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        //init your presenter here
        //presenter = StudentLoginPresenter(activity)
        //

        studentLoginButton.setOnClickListener {
            presenter.onLogin(rollNoText.toString(), studentPasswordText.toString())
        }

        registrationLink.setOnClickListener {
            //redirect to website
        }
    }

    override fun onLoginResult(message: String) {
        if (message == "success") {
            startActivity(Intent(activity, ExaminationActivity::class.java))
        }
        else{
            println(message)
        }
    }

    override fun setPresenter(presenter: LoginContract.Presenter) {
        this.presenter = presenter
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }


    companion object {
        fun newInstance():StudentLogin {
            val fragment = StudentLogin()
            val args = Bundle()

            return fragment
        }
    }


}
