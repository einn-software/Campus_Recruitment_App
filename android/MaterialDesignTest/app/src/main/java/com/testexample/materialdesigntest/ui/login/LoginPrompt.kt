package com.testexample.materialdesigntest.ui.login

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.FragmentTransaction

import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.fragment_login_prompt.*


/**
 * A simple [Fragment] subclass.
 * Use the [LoginPrompt.newInstance] factory method to
 * create an instance of this fragment.
 */
class LoginPrompt : Fragment(R.layout.fragment_login_prompt) {

    lateinit var studentLogin: StudentLogin


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        studentLogin = StudentLogin.newInstance()

        joinTestButton.setOnClickListener {
            activity!!.supportFragmentManager
                .beginTransaction()
                .replace(R.id.loginFragment, studentLogin)
                .addToBackStack(null)
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()
        }

        collegeLoginButton.setOnClickListener {
            val intent = Intent(activity, CollegeLoginActivity::class.java)
            startActivity(intent)
        }


    }



    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment LoginPrompt.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance() =
            LoginPrompt().apply {
                arguments = Bundle()
                }
            }

}
