package com.testexample.materialdesigntest.ui.instructions

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.examination.ExamDrawer
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_instructions.*
import com.testexample.materialdesigntest.ui.instructions.TAG as InstructionsTAG

private const val TAG = "Instruction Fragment"

class  InstructionsFragment : Fragment(R.layout.fragment_instructions), InstructionsContract.View{

    private lateinit var presenter: InstructionsContract.Presenter
    private lateinit var progressBar: ProgressBar
    private lateinit var questionPaper: QuestionPaper
    private lateinit var student: Student

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            questionPaper = it.getParcelable(Constants.QUESTION_PAPER)!!
            student = it.getParcelable(Constants.STUDENT)!!
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Log.d(InstructionsTAG," on viewCreated")
        progressBar = ProgressBar(requireActivity())
        presenter = InstructionPresenter(this)
        Log.d(InstructionsTAG, questionPaper.toString() + student.toString())
        presenter.fetchInstructions(questionPaper.instructionId)

        agreeToGuidelinesCheck.setOnClickListener {
            startTestButton.isEnabled = agreeToGuidelinesCheck.isChecked
        }

        startTestButton.setOnClickListener {
            startActivity(Intent(activity, ExamDrawer::class.java)
                    .apply {
                    putExtra(Constants.QUESTION_PAPER, questionPaper)
                    putExtra(Constants.STUDENT, student)
                    })
        }
    }

    override fun showInstructions(instruction: Instructions) {
        guidelinesText.text = instruction.message
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
        fun newInstance(questionPaper: QuestionPaper, student: Student):
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
