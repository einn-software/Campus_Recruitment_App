package com.testexample.materialdesigntest.ui.login

import `in`.galaxyofandroid.spinerdialog.SpinnerDialog
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.CollegeResponse
import com.testexample.materialdesigntest.data.network.model.StudentLoginRequest
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.instructions.InstructionActivity
import com.testexample.materialdesigntest.ui.resetAuthentication.ResetAuthenticationActivity
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.fragment_student_login.*

class StudentLogin : Fragment(R.layout.fragment_student_login), LoginContract.View {

    private val TAG = "StudentLogin"
    private lateinit var presenter: LoginContract.Presenter
    private lateinit var progressBar: ProgressBar
    private var collegeCode: Int = 0
    private lateinit var spinnerDialog: SpinnerDialog

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        HyperLog.d(TAG, "<< onViewCreated")

        searchableSpinnerForCollege.isEnabled = false
        presenter = LoginPresenter(this)
        progressBar = ProgressBar(requireActivity())
        presenter.generateCollegeList()

        searchableSpinnerForCollege.setOnSingleClickListener {
            spinnerDialog.showSpinerDialog()
        }

        studentLoginButton.setOnSingleClickListener {
            presenter
                    .onStudentLogin(StudentLoginRequest(
                            rollNoText.text.toString(),
                            collegeCode,
                            studentPasswordText.text.toString()
                    ))
        }

        forgotPasswordLink.setOnSingleClickListener {
            startActivity(Intent(activity, ResetAuthenticationActivity::class.java)
                    .putExtra(Constants.USERTYPE, "student"))
        }

        registrationLink.setOnSingleClickListener {
            Toast.makeText(requireContext(), "Registration Not Available", Toast.LENGTH_LONG).show()
            val openURL = Intent(Intent.ACTION_VIEW)
            openURL.data = Uri.parse(Constants.WEBSITE_LINK)
            startActivity(openURL)
        }
        HyperLog.d(TAG, ">> onViewCreated")
    }

    override fun openMainActivity() {
        HyperLog.d(TAG, "<< openMainActivity")
        startActivity(Intent(activity, InstructionActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            flags = Intent.FLAG_ACTIVITY_NEW_TASK
        })
        requireActivity().finish()
        HyperLog.d(TAG, ">> openMainActivity")
    }

    override fun onValidationMessage(errorCode: Int) {
        HyperLog.d(TAG, "<< onValidationMessage")
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
        HyperLog.d(TAG, ">> onValidationMessage")
    }

    override fun showLoading(flag: Boolean) {
        HyperLog.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else {
            progressBar.stopLoading()
        }
        HyperLog.d(TAG, ">> showLoading")
    }


    override fun loadSpinner(collegeList: List<CollegeResponse>) {
        searchableSpinnerForCollege.isEnabled = true
        HyperLog.d(TAG, "<< loadSpinner")
        val collegeNameList = getCollegeNameList(collegeList)

        spinnerDialog = SpinnerDialog(requireActivity(), collegeNameList,
            "Select Your College", R.style.MyDialogAnimationTheme)

        spinnerDialog.bindOnSpinerListener { item, position ->
            collegeCode = collegeList[position].collegeCode
            HyperLog.d("Student Login", "code is $collegeCode")
            searchableSpinnerForCollege.text = item
        }
        HyperLog.d(TAG, ">> loadSpinner")
    }

    private fun getCollegeNameList(collegeList: List<CollegeResponse>): ArrayList<String> {
        HyperLog.d(TAG, "<< getCollegeNameList")
        val result = ArrayList<String>()

        for (college in collegeList) {
            result.add(college.collegeName!! + ", " + college.collegeCode.toString())
        }

        HyperLog.d(TAG, ">> getCollegeNameList")
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
            Bundle()

            return fragment
        }
    }


}
