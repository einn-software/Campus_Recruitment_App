package com.testexample.materialdesigntest.ui.studentdashboard

import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.View.VISIBLE
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Result
import kotlinx.android.synthetic.main.activity_student_dashboard.*
import kotlinx.android.synthetic.main.fragment_student_result.*

private const val ARG_RESULT = "requestResult"
//Future Use
private const val ARG_STUDENT_ROLL_NO = "id"

class StudentResult : Fragment(R.layout.fragment_student_result) {

    private val TAG = "Student Result"
    private var requestResult: Result? = null
    private var studentId: Long = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        super.onCreate(savedInstanceState)
        arguments?.let {
            requestResult = it.getParcelable(ARG_RESULT)!!
            studentId = it.getLong(ARG_STUDENT_ROLL_NO)
        }

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG,"onViewCreated")
        super.onViewCreated(view, savedInstanceState)

        val result = requestResult!!

        totalQuestionsAttemptedRightValue.text = result
            .noOfQuestionsCorrect.toString()


        totalQuestionsAttemptedValue.text = result
            .noOfQuestionsAttempted
            .toString()


        totalQuestionsAttemptedWrongValue.text = (result
            .noOfQuestionsAttempted - result
            .noOfQuestionsCorrect)
            .toString()

        totalMarksValue.text = result
            .totalMarks
            .toString()

        totalMarksObtainedValue.text = result
            .scoredMarks
            .toString()
    }

    override fun onDetach() {
        Log.d(TAG, "onDetach")
        super.onDetach()
        requireActivity().studentDashboardContainer.visibility = VISIBLE
    }

    companion object {
        @JvmStatic
        fun newInstance(
            requestResult: Result,
            id: Long
        ) =
            StudentResult().apply {
                arguments = Bundle().apply {
                    putParcelable(ARG_RESULT, requestResult)
                    putLong(ARG_STUDENT_ROLL_NO, id)
                }
            }
    }
}
