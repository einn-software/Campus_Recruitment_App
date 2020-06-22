package com.testexample.materialdesigntest.ui.TPODashboard

import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.View.VISIBLE
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*

/**
 * Data Upload [Fragment] subclass.
 */
class DataUpload : Fragment(R.layout.fragment_data_upload) {

    private val TAG = "Data Upload"

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        super.onCreate(savedInstanceState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG, "onViewCreated")
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onDetach() {
        Log.d(TAG, "onDetach")
        super.onDetach()
        tpoDashboardContainer.visibility = VISIBLE
    }

    companion object {
        fun newInstance():DataUpload {
            val fragment = DataUpload()
            val args = Bundle()

            return fragment
        }
    }

}
