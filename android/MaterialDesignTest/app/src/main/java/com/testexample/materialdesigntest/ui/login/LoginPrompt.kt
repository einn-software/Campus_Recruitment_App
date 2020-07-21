package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.fragment_login_prompt.*

class LoginPrompt : Fragment(R.layout.fragment_login_prompt) {

    private val TAG = LoginPrompt.toString()
    lateinit var studentLogin: StudentLogin

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        HyperLog.d(TAG, "<< onViewCreated")

        studentLogin = StudentLogin.newInstance()

        joinTestButton.setOnSingleClickListener {
            requireActivity().supportFragmentManager
                .beginTransaction()
                .replace(R.id.loginFragment, studentLogin)
                .addToBackStack("StudentLogin")
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()
        }

        collegeLoginButton.setOnSingleClickListener {
            val intent = Intent(activity, TpoLoginActivity::class.java)
            startActivity(intent)
        }
        HyperLog.d(TAG, ">> onViewCreated")
    }

    companion object {
        @JvmStatic
        fun newInstance() =
            LoginPrompt().apply {
                arguments = Bundle()
            }
    }
}
