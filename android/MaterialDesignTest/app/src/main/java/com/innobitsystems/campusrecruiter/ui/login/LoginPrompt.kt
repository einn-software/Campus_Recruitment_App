package com.innobitsystems.campusrecruiter.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import com.innobitsystems.campusrecruiter.ui.instructions.InstructionActivity
import com.innobitsystems.campusrecruiter.ui.tpoDashboard.TPODashboard
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.fragment_login_prompt.*

class LoginPrompt : Fragment(R.layout.fragment_login_prompt) {

    private val TAG = "LoginPrompt"
    private lateinit var studentLogin: StudentLogin
    lateinit var sessionManager: SessionManager

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        HyperLog.d(TAG, "<< onViewCreated")

        sessionManager = SessionManager(requireContext())
        val loadedUserType: String? = sessionManager.getUserType()
        if (loadedUserType != null) {
            HyperLog.i(TAG, "user type : $loadedUserType")
            if (loadedUserType == "2") {
                startActivity(Intent(activity, TPODashboard::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
                activity?.finish()
            }
            else if (loadedUserType == "3"){
                startActivity(Intent(activity, InstructionActivity::class.java).apply {
                    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
                requireActivity().finish()
            }
        } else {
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
    }

    companion object {
        @JvmStatic
        fun newInstance() =
            LoginPrompt().apply {
                arguments = Bundle()
            }
    }
}
