package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.View
import androidx.fragment.app.FragmentTransaction

import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.fragment_login_prompt.*

class LoginPrompt : Fragment(R.layout.fragment_login_prompt) {

    private val TAG = LoginPrompt.toString()
    lateinit var studentLogin: StudentLogin

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "<< onViewCreated")

        studentLogin = StudentLogin.newInstance()

        joinTestButton.setOnClickListener {
            requireActivity().supportFragmentManager
                .beginTransaction()
                .replace(R.id.loginFragment, studentLogin)
                .addToBackStack("StudentLogin")
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()
        }

        collegeLoginButton.setOnClickListener {
            val intent = Intent(activity, TpoLoginActivity::class.java)
            startActivity(intent)
        }
        Log.d(TAG, ">> onViewCreated")
    }

    companion object {
        @JvmStatic
        fun newInstance() =
            LoginPrompt().apply {
                arguments = Bundle()
            }
    }
}
