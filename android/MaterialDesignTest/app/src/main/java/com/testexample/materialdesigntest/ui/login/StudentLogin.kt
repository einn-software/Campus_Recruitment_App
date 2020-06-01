package com.testexample.materialdesigntest.ui.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.fragment.app.Fragment

import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.ui.instructions.InstructionActivity
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_student_login.*

/**
 * A simple [Fragment] subclass for student login
 */
class  StudentLogin : Fragment(R.layout.fragment_student_login), LoginContract.View{

    private lateinit var presenter: LoginContract.Presenter


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        presenter = LoginPresenter(this)
        presenter.generateCollegeList()

        studentLoginButton.setOnClickListener {
            presenter.onStudentLogin(rollNoText.text.toString(),
                "15787851")
        }

        registrationLink.setOnClickListener {
            //redirect to website
        }
    }

    override fun openMainActivity() {
        startActivity(Intent(activity, InstructionActivity::class.java))
    }

    override fun onValidationMessage(errorCode: Int) {
        when (errorCode) {
            Constants.EMPTY_ROLL_NO_ERROR ->
                Toast.makeText(activity, getString(R.string.empty_roll_no_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.INVALID_ROLL_NO_ERROR ->
                Toast.makeText(activity, getString(R.string.invalid_roll_no_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.EMPTY_PASSWORD_ERROR ->
                Toast.makeText(activity, getString(R.string.empty_password_error_message),
                    Toast.LENGTH_LONG).show()
            Constants.LOGIN_FAILURE ->
                Toast.makeText(activity, getString(R.string.login_failure),
                    Toast.LENGTH_LONG).show()
        }
    }

    override fun showLoading(flag: Boolean) {
        TODO("Not yet implemented")
    }

    override fun loadSpinner(collegeList: List<CollegeResponse>) {
        val collegeNameList = getCollegeNameList(collegeList)
        searchableSpinnerForCollege.adapter = ArrayAdapter<String>(requireActivity(),
            android.R.layout.simple_spinner_item, collegeNameList)
    }

    private fun getCollegeNameList(collegeList: List<CollegeResponse>): List<String> {
        val result = ArrayList<String>()
        for (college in collegeList){
            result.add(college.collegeName!! + ", " + college.collegeCode.toString())
        }
        return result
    }

    override fun setPresenter(presenter: LoginContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.requireContext()
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
