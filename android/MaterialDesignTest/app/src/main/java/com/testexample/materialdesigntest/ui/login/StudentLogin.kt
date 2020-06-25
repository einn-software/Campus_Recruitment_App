package com.testexample.materialdesigntest.ui.login

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.fragment.app.Fragment

import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.instructions.InstructionActivity
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_student_login.*

/**
 * A simple [Fragment] subclass for student login
 */
class StudentLogin : Fragment(R.layout.fragment_student_login), LoginContract.View {

    private val TAG = "StudentLogin"
    private lateinit var presenter: LoginContract.Presenter
    private lateinit var progressBar: ProgressBar
    private var collegeCode: Int = 0

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "<< onViewCreated")

        presenter = LoginPresenter(this)
        progressBar = ProgressBar(requireActivity())
        presenter.generateCollegeList()

        studentLoginButton.setOnClickListener {
            presenter
                    .onStudentLogin(StudentLoginRequest(
                            rollNoText.text.toString(),
                            collegeCode,
                            studentPasswordText.text.toString()
                    ))
        }

        forgotPasswordLink.setOnClickListener {
            startActivity(Intent(activity, ResetAuthenticationActivity::class.java)
                    .putExtra("user_type", "student"))
        }

        registrationLink.setOnClickListener {
            val openURL = Intent(android.content.Intent.ACTION_VIEW)
            openURL.data = Uri.parse("URL")
            startActivity(openURL)
        }
        Log.d(TAG, ">> onViewCreated")
    }

    override fun openMainActivity() {
        Log.d(TAG, "<< openMainActivity")
        startActivity(Intent(activity, InstructionActivity::class.java))
        Log.d(TAG, ">> openMainActivity")
    }

    override fun onValidationMessage(errorCode: Int) {
        Log.d(TAG, "<< onValidationMessage")
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
            Constants.EMPTY_CODE_ERROR ->
                Toast.makeText(activity, getString(R.string.invalid_code),
                        Toast.LENGTH_LONG).show()
        }
        Log.d(TAG, ">> onValidationMessage")
    }

    override fun showLoading(flag: Boolean) {
        Log.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else {
            progressBar.stopLoading()
        }
        Log.d(TAG, ">> showLoading")
    }

    override fun loadSpinner(collegeList: List<CollegeResponse>) {
        Log.d(TAG, "<< loadSpinner")
        val collegeNameList = getCollegeNameList(collegeList)
        searchableSpinnerForCollege.adapter = ArrayAdapter<String>(requireActivity(),
                android.R.layout.simple_spinner_item, collegeNameList)

        //set code
        searchableSpinnerForCollege.onItemSelectedListener = (object : AdapterView
        .OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {
                Toast.makeText(activity, "Please Select Your College...", Toast.LENGTH_SHORT).show()
            }

            override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
            ) {
                collegeCode = collegeList[position].collegeCode
                Log.d("Student Login", "code is $collegeCode")
            }

        })
        Log.d(TAG, ">> loadSpinner")
    }

    private fun getCollegeNameList(collegeList: List<CollegeResponse>): List<String> {
        Log.d(TAG, "<< loadSpinner")
        val result = ArrayList<String>()

        for (college in collegeList) {
            result.add(college.collegeName!! + ", " + college.collegeCode.toString())
        }

        Log.d(TAG, ">> loadSpinner")
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
        fun newInstance(): StudentLogin {
            val fragment = StudentLogin()
            val args = Bundle()

            return fragment
        }
    }


}
