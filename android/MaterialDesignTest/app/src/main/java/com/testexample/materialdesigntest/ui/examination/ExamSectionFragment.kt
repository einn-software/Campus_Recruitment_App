package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.fragment_exam.*

private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

class ExamSectionFragment : Fragment(R.layout.fragment_exam) {

    val TAG = "Exam Fragment" + this.id
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        questionNumber.text = "Question $param1"
    }

    override fun onResume() {
        Log.d(TAG, "onResume $param1")
        super.onResume()
    }

    companion object {
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ExamSectionFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}
