package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_exam_info.*
import java.util.*

class ExamInfo : Fragment(R.layout.fragment_exam_info), InstructionsContract.ExamInfoView {

    private lateinit var instructionsFragment: InstructionsFragment
    private lateinit var presenter: InstructionsContract.ExamInfoPresenter
    private lateinit var progressBar: ProgressBar
    val TAG = "ExamInfo Fragment"
    private lateinit var questionPaper: QuestionPaper

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Log.d(TAG,"on view created")

        progressBar = ProgressBar(requireActivity())
        val calender = Calendar.getInstance()
        val year : Int = calender.get(Calendar.YEAR)
        val month : Int = calender.get(Calendar.MONTH)
        val dayOfMonth : Int = calender.get(Calendar.DAY_OF_MONTH)
        presenter = ExamInfoPresenter(this)

        presenter.fetchCollegeCode(year, month, dayOfMonth)

        availableExamsTab.setOnClickListener {
            openNextFragment(questionPaper = this.questionPaper,
                    student = presenter.student)
        }
    }

    override fun showExamInfo(questionPaper: QuestionPaper?) {
        val message: String
        if (null == questionPaper) {
            message = Constants.NO_EXAM_FOUND
        } else {
            this.questionPaper = questionPaper
            message = "Your Exam for " + questionPaper.questionPaperName

        }
        availableExamsTabText.text = message
    }

    override fun openNextFragment(questionPaper: QuestionPaper, student: Student){
        instructionsFragment = InstructionsFragment
                .newInstance(questionPaper, student)
        requireActivity().supportFragmentManager
                .beginTransaction()
                .replace(R.id.instructionsFragmentContainer, instructionsFragment)
                .addToBackStack(null)
                .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                .commit()
    }

    override fun showLoading(flag: Boolean) {
        if (flag){
            progressBar.startLoading()
        }
        else {
            progressBar.stopLoading()
        }
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
