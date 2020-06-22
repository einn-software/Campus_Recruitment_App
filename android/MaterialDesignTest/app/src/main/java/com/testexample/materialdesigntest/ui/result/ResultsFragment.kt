package com.testexample.materialdesigntest.ui.result


import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment

import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_student_result.*

class ResultsFragment : Fragment(R.layout.fragment_student_result), ResultsContract.View {

    val TAG = "ResultsFragment"
    private lateinit var presenter: ResultsContract.Presenter
    private var code: Int? = 0
    private var roll: String? = null
    private var questionPaperId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "onCreate")
        arguments?.let {
            code = it.getInt(Constants.CODE)
            roll = it.getString(Constants.ROLL)
            questionPaperId = it.getString(Constants.QUESTION_PAPER_ID)
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Log.d(TAG, " onViewCreated")

        presenter = ResultsPresenter(this)
        code?.let { roll?.let { it1 -> questionPaperId?.let { it2 -> presenter.fetchStudentResult(it, it1, it2) } } }
    }

    override fun showResults(result: Result) {
        rollNoValue.text = result.roll
        userNameValue.text = result.name
        totalMarksValue.text = result.total_marks.toString()
        totalQuestionsAttemptedValue.text = result.question_attempt.toString() + "/" + result.total_question
        totalQuestionsAttemptedRightValue.text = result.correct_attempt.toString()
        totalQuestionsAttemptedWrongValue.text = (result.question_attempt - result.correct_attempt).toString()
        totalMarksObtainedValue.text = result.total_marks_scored.toString()
    }

    override fun setPresenter(presenter: ResultsContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.requireContext()
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }

    companion object {
        fun newInstance(code: Int?, roll: String?, question_paper_id: String?):
                ResultsFragment {
            return ResultsFragment().apply {
                arguments = Bundle().apply {
                    if (code != null) {
                        putInt(Constants.CODE, code)
                    }
                    putString(Constants.ROLL, roll)
                    putString(Constants.QUESTION_PAPER_ID, question_paper_id)
                }
            }
        }
    }
}
