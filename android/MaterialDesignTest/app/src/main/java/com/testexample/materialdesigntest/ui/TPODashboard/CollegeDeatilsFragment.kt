package com.testexample.materialdesigntest.ui.TPODashboard

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import kotlinx.android.synthetic.main.fragment_college_details.*


/**
 * A simple [Fragment] subclass.
 * Use the [CollegeDetailsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */

@SuppressLint("ResourceType")
class CollegeDetailsFragment : Fragment(R.layout.fragment_college_details), TPODashboardContract.CollegeDetailsView {

    private lateinit var presenter: TPODashboardContract.CollegeDetailsPresenter
    val TAG = "CollegeDetailsFragment"

    override fun setPresenter(presenter: TPODashboardContract.CollegeDetailsPresenter) {
        Log.d(TAG,"<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG,">> setPresenter()")
    }

    override fun setContext(): Context {
        Log.d(TAG,"<< setContext()")
        Log.d(TAG,">> setContext()")
        return this.requireContext()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG,"<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)
        presenter = CollegeDetailsPresenter(this)
        presenter .fetchCollegeDetails(2346)

        editCollegeButton.setOnClickListener() {
            Log.d(TAG,"<< editCollegeButton| setOnClickListener()")
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
            Log.d(TAG,">> editCollegeButton| setOnClickListener()")
        }

        saveCollegeButton.setOnClickListener(){
            Log.d(TAG,"<< saveCollegeButton| setOnClickListener()")
            val collegeDetails = UpdateCollegeDetails(collegeNameValue.text.toString(), collegeAddressValue.text.toString(), collegeUniversityValue.text.toString(), collegeEmailValue.text.toString(),collegePhoneValue.text.toString())
            presenter.saveCollegeDetails(2346,collegeDetails)
            Toast.makeText(this.requireContext(), "Successfully Updated College Details",
                    Toast.LENGTH_LONG).show()
            presenter.fetchCollegeDetails(2346)
            Log.d(TAG,">> saveCollegeButton| setOnClickListener()")
        }
        Log.d(TAG,">> onViewCreated()")
    }

    override fun showCollegeDetails(college: College) {
        Log.d(TAG,"<< showCollegeDetails()")
        collegeNameValue.setText(college.name)
        collegeNameValue.isEnabled = false
        collegeAddressValue.setText(college.address)
        collegeAddressValue.isEnabled = false
        collegeUniversityValue.setText(college.university)
        collegeUniversityValue.isEnabled = false
        collegeEmailValue.setText(college.email)
        collegeEmailValue.isEnabled = false
        collegePhoneValue.setText(college.phone)
        collegePhoneValue.isEnabled = false
        Log.d(TAG,">> showCollegeDetails()")
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
        fun newInstance() =
                CollegeDetailsFragment().apply {
                    arguments = Bundle().apply {
                    }
                }

    }
}