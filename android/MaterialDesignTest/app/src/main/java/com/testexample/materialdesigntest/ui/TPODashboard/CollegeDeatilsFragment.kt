package com.testexample.materialdesigntest.ui.TPODashboard

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_college_details.*


/**
 * A simple [Fragment] subclass.
 * Use the [CollegeDetailsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class CollegeDetailsFragment : Fragment(), TPODashboardContract.View {

    private lateinit var presenter: TPODashboardContract.Presenter
    val TAG = "CollegeDetailsFragment"

    private var name: String? = null
    private var address: String? = null
    private var university: String? = null
    private var email: String? = null
    private var phone: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG,"<< onCreate()")
        super.onCreate(savedInstanceState)
        arguments?.let {
            name = it.getString(Constants.COLLEGE_NAME)
            address = it.getString(Constants.COLLEGE_ADDRESS)
            university = it.getString(Constants.COLLEGE_UNIVERSITY)
            email = it.getString(Constants.COLLEGE_EMAIL)
            phone = it.getString(Constants.COLLEGE_PHONE)
        }
        Log.d(TAG,">> onCreate()")
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG,"<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)
        presenter = TPODashboardPresenter(this)

        editCollegeButton.setOnClickListener() {
            val meditCollegeName = collegeNameValue
            meditCollegeName.isEnabled = true
            val meditCollegeAddress = collegeAddressValue
            meditCollegeAddress.isEnabled = true
            val meditCollegeUniversity = collegeUniversityValue
            meditCollegeUniversity.isEnabled = true
            val meditCollegeEmail = collegeEmailValue
            meditCollegeEmail.isEnabled = true
            val meditCollegePhone = collegePhoneValue
            meditCollegePhone.isEnabled = true
        }

        saveCollegeButton.setOnClickListener(){
            name = collegeNameValue.toString()
            address = collegeAddressValue.toString()
            university = collegeUniversityValue.toString()
            email = collegeEmailValue.toString()
            phone = collegePhoneValue.toString()
            name?.let { it1 -> address?.let { it2 -> university?.let { it3 -> email?.let { it4 -> phone?.let { it5 -> presenter.saveCollegeDetails(it1, it2, it3, it4, it5) } } } } }
        }
        Log.d(TAG,">> onViewCreated()")
    }

    override fun showCollegeDetails(college: College) {
        Log.d(TAG,"<< showCollegeDetails()")
        collegeNameValue.setText(college.name)
        collegeAddressValue.setText(college.address)
        collegeUniversityValue.setText(college.university)
        collegeEmailValue.setText(college.email)
        collegePhoneValue.setText(college.phone)
        Log.d(TAG,">> showCollegeDetails()")
    }

    override fun setPresenter(presenter: TPODashboardContract.Presenter) {
        Log.d(TAG,"<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG,">> setPresenter()")
    }

    override fun setContext(): Context {
        Log.d(TAG,"<< setContext()")
        Log.d(TAG,">> setContext()")
        return this.requireContext()
    }


    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment CollegeDetailsFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(name: String, address: String, university: String, email: String, phone: String) =
                CollegeDetailsFragment().apply {
                    arguments = Bundle().apply {
                        putString(Constants.COLLEGE_NAME, name)
                        putString(Constants.COLLEGE_ADDRESS, address)
                        putString(Constants.COLLEGE_UNIVERSITY, university)
                        putString(Constants.COLLEGE_EMAIL, email)
                        putString(Constants.COLLEGE_PHONE, phone)
                    }
                }
    }
}