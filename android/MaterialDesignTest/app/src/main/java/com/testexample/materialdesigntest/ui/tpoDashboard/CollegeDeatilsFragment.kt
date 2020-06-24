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
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_college_details.*


/**
 * A simple [Fragment] subclass.
 * Use the [CollegeDetailsFragment.newInstance] factory method to
 * create an instance of this fragment.
 */

@SuppressLint("ResourceType")
class CollegeDetailsFragment : Fragment(R.layout.fragment_college_details),
        TPODashboardContract.CollegeDetailsView {

    private lateinit var presenter: TPODashboardContract.CollegeDetailsPresenter
    private var code : Int = 0
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

        arguments?.let {
            code = it.getInt(Constants.CODE)
        }

        presenter = CollegeDetailsPresenter(this)
        presenter .fetchCollegeDetails(code)

        editCollegeButton.setOnClickListener {
            Log.d(TAG,"<< editCollegeButton| setOnClickListener()")
            val mEditCollegeName = collegeNameValue
            mEditCollegeName.isEnabled = true
            val meditCollegeAddress = collegeAddressValue
            meditCollegeAddress.isEnabled = true
            val mEditCollegeUniversity = collegeUniversityValue
            mEditCollegeUniversity.isEnabled = true
            val mEditCollegeEmail = collegeEmailValue
            mEditCollegeEmail.isEnabled = true
            val mEditCollegePhone = collegePhoneValue
            mEditCollegePhone.isEnabled = true
            Log.d(TAG,">> editCollegeButton| setOnClickListener()")
        }

        saveCollegeButton.setOnClickListener{
            Log.d(TAG,"<< saveCollegeButton| setOnClickListener()")
<<<<<<< HEAD:android/MaterialDesignTest/app/src/main/java/com/testexample/materialdesigntest/ui/tpoDashboard/CollegeDeatilsFragment.kt
            val collegeDetails = UpdateCollegeDetails(collegeNameValue.text.toString(),
                    collegeAddressValue.text.toString(), collegeUniversityValue.text.toString(),
                    collegeEmailValue.text.toString(),collegePhoneValue.text.toString())
            presenter.saveCollegeDetails(2346,collegeDetails)
            Toast.makeText(this.requireContext(), "Successfully Updated College Details",
                    Toast.LENGTH_LONG).show()
=======
            val collegeDetails = UpdateCollegeDetails(collegeNameValue.text.toString(), collegeAddressValue.text.toString(), collegeUniversityValue.text.toString(), collegeEmailValue.text.toString(),collegePhoneValue.text.toString())
            presenter.saveCollegeDetails(code,collegeDetails)
            Toast.makeText(this.requireContext(), "Successfully Updated College Details",
                    Toast.LENGTH_LONG).show()
            presenter.fetchCollegeDetails(code)
>>>>>>> f3d79ebc1893867388b4555e10c123e2c0a2789a:android/MaterialDesignTest/app/src/main/java/com/testexample/materialdesigntest/ui/TPODashboard/CollegeDeatilsFragment.kt
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
        @JvmStatic
        fun newInstance(code: Int) =
                CollegeDetailsFragment().apply {
                    arguments = Bundle().apply {
                        putInt(Constants.CODE,code)
                    }
                }
    }
}