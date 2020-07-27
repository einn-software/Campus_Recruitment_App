package com.innobitsystems.campusrecruiter.ui.tpoDashboard

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.View.VISIBLE
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.model.College
import com.innobitsystems.campusrecruiter.data.network.model.UpdateCollegeDetails
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
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
        HyperLog.d(TAG,"<< setPresenter()")
        this.presenter = presenter
        HyperLog.d(TAG,">> setPresenter()")
    }

    override fun setContext(): Context {
        HyperLog.d(TAG,"<< setContext()")
        HyperLog.d(TAG,">> setContext()")
        return this.requireContext()
    }

    override fun onDetach() {
        HyperLog.d(TAG, "onDetach()")
        requireActivity().tpoDashboardContainer.visibility = VISIBLE
        super.onDetach()

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        HyperLog.d(TAG,"<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)

        arguments?.let {
            code = it.getInt(Constants.CODE)
        }

        presenter = CollegeDetailsPresenter(this)
        presenter .fetchCollegeDetails(code)

        editCollegeButton.setOnSingleClickListener {
            HyperLog.d(TAG,"<< editCollegeButton| setOnClickListener()")
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
            HyperLog.d(TAG,">> editCollegeButton| setOnClickListener()")
        }

        saveCollegeButton.setOnSingleClickListener{
            HyperLog.d(TAG,"<< saveCollegeButton| setOnClickListener()")
            val collegeDetails = UpdateCollegeDetails(collegeNameValue.text.toString(),
                    collegeAddressValue.text.toString(), collegeUniversityValue.text.toString(),
                    collegeEmailValue.text.toString(),collegePhoneValue.text.toString())
            presenter.saveCollegeDetails(code,collegeDetails)
            Toast.makeText(this.requireContext(), "Successfully Updated College Details",
                    Toast.LENGTH_LONG).show()
            presenter.fetchCollegeDetails(code)
            HyperLog.d(TAG,">> saveCollegeButton| setOnClickListener()")
        }
        HyperLog.d(TAG,">> onViewCreated()")
    }

    override fun showCollegeDetails(college: College) {
        HyperLog.d(TAG,"<< showCollegeDetails()")
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
        HyperLog.d(TAG,">> showCollegeDetails()")
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