package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_exam_info.*
import java.util.*

class ExamInfo : Fragment(R.layout.fragment_exam_info), InstructionsContract.ExamInfoView {

    private lateinit var instructionsFragment: InstructionsFragment
    private lateinit var presenter: InstructionsContract.ExamInfoPresenter
    private lateinit var progressBar: ProgressBar
    val TAG = "ExamInfo"
    private var instructionsId: String? = null
    private var questionPaperId: String? = null
    

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG, "<< onViewCreated")

        progressBar = ProgressBar(requireActivity())
        val calender = Calendar.getInstance()
        val year: Int = calender.get(Calendar.YEAR)
        val month: Int = calender.get(Calendar.MONTH)
        val dayOfMonth: Int = calender.get(Calendar.DAY_OF_MONTH)
        presenter = ExamInfoPresenter(this)

        presenter.fetchCollegeCode(year, month, dayOfMonth)

        availableExamsTab.setOnClickListener {
            if (questionPaperId == null){
                startActivity(Intent(activity, LoginActivity::class.java).apply {
                   flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
                requireActivity().finish()
            }
            else
                openNextFragment(instructionsId!!, questionPaperId!!)
        }
        Log.d(TAG, ">> onViewCreated")
    }

    override fun showExamInfo(questionPaper: QuestionPaper?) {
        Log.d(TAG, "<< showExamInfo")
        val message: String

        if (null == questionPaper) {
            message = Constants.NO_EXAM_FOUND
        } else {
            message = "Your Exam for " + QuestionPaper.questionPaperName
            instructionsId = QuestionPaper.instructionId
            questionPaperId = QuestionPaper.questionPaperId
        }
        availableExamsTabText.text = message
        Log.d(TAG, ">> showExamInfo")
    }

    override fun openNextFragment(instructionsId: String, questionPaperId: String){
        instructionsFragment = InstructionsFragment
                .newInstance(instructionsId, questionPaperId)
        requireActivity().supportFragmentManager
                .beginTransaction()
                .replace(R.id.instructionsFragmentContainer, instructionsFragment)
                .addToBackStack(null)
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()

        Log.d(TAG, ">> openNextFragment")
    }

    override fun showLoading(flag: Boolean) {
        Log.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else {
            progressBar.stopLoading()
        }
        Log.d(TAG, ">> openNextFragment")
    }

    override fun setPresenter(presenter: InstructionsContract.ExamInfoPresenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return requireContext()
    }

    companion object {
        @JvmStatic
        fun newInstance() =
                ExamInfo().apply {
                    arguments = Bundle()
                }
    }
}
