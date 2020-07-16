package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.examination.ExamDrawer
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_instructions.*

class  InstructionsFragment : Fragment(R.layout.fragment_instructions), InstructionsContract.View{

    private val TAG = "InstructionsFragment"
    private lateinit var presenter: InstructionsContract.Presenter
    private lateinit var progressBar: ProgressBar
    private lateinit var questionPaper: QuestionPaper
    private lateinit var student: Student

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        HyperLog.d(TAG, "<< onCreate")

        arguments?.let {
            questionPaper = it.getParcelable(Constants.QUESTION_PAPER)!!
            student = it.getParcelable(Constants.STUDENT)!!
        }
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        HyperLog.d(TAG,"<< onViewCreated")

        progressBar = ProgressBar(requireActivity())
        presenter = InstructionPresenter(this)
        presenter.fetchInstructions(questionPaper.instructionId)

        agreeToGuidelinesCheck.setOnClickListener {
            startTestButton.isEnabled = agreeToGuidelinesCheck.isChecked
        }

        startTestButton.setOnClickListener {
            startActivity(Intent(activity, ExamDrawer::class.java)
                    .apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    putExtra(Constants.QUESTION_PAPER, questionPaper)
                    putExtra(Constants.STUDENT, student)
                    })
            requireActivity().finish()
        }
        HyperLog.d(TAG,">> onViewCreated")
    }

    override fun showInstructions(instruction: Instructions) {
        HyperLog.d(TAG,"<< showInstructions")
        guidelinesText.text = instruction.message
        HyperLog.d(TAG,">> showInstructions")
    }

    override fun setPresenter(presenter: InstructionsContract.Presenter) {
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
        fun newInstance(questionPaper: QuestionPaper,student: Student):
                InstructionsFragment {

            return InstructionsFragment().apply {
                arguments = Bundle().apply {
                    putParcelable(Constants.QUESTION_PAPER, questionPaper)
                    putParcelable(Constants.STUDENT, student)
                }
            }
        }
    }


}
