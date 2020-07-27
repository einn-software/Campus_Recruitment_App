package com.innobitsystems.campusrecruiter.ui.result


import android.content.Context
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog

import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.snackBar
import kotlinx.android.synthetic.main.fragment_student_result.*
import kotlin.properties.Delegates

class ResultsFragment : Fragment(R.layout.fragment_student_result), ResultsContract.View {

    val TAG = "ResultsFragment"
    private lateinit var presenter: ResultsContract.Presenter
    private var code by Delegates.notNull<Int>()
    private lateinit var roll: String
    private lateinit var questionPaperId: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        HyperLog.d(TAG, "<< onCreate")

        arguments?.let {
            code = it.getInt(Constants.CODE)
            roll = it.getString(Constants.ROLL).toString()
            questionPaperId = it.getString(Constants.QUESTION_PAPER_ID).toString()
        }
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        HyperLog.d(TAG, "<< onViewCreated")
        HyperLog.d(TAG, "$code + $roll + $questionPaperId")

        presenter = ResultsPresenter(this)
        presenter.fetchStudentResult(code, roll, questionPaperId)
        HyperLog.d(TAG, ">> onViewCreated")
    }

    override fun showResults(result: Result) {
        HyperLog.d(TAG, "<< showResults")
        rollNoValue.text = result.studentRollNo
        userNameValue.text = result.studentName
        totalMarksValue.text = result.totalMarks.toString()
        totalQuestionsAttemptedValue.text = getString(R.string.attempted_question_ratio,
                result.noOfQuestionsAttempted,result.totalNoOfQuestions)
        totalQuestionsAttemptedRightValue.text = result.noOfQuestionsCorrect.toString()
        totalQuestionsAttemptedWrongValue.text = (result.noOfQuestionsAttempted - result.noOfQuestionsCorrect).toString()
        totalMarksObtainedValue.text = result.scoredMarks.toString()
        resultLayout.snackBar("Double press back button to log out")
        HyperLog.d(TAG, ">> showResults")
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
