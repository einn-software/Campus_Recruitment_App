package com.testexample.materialdesigntest.ui.instructions

import android.content.ContentValues.TAG
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.fragment.app.Fragment

import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.examination.ExamDrawer
import kotlinx.android.synthetic.main.fragment_instructions.*

private const val QUESTION_PAPER_ID = "question_paper_id"
private const val INSTRUCTION_ID = "instructions_id"

class  InstructionsFragment : Fragment(R.layout.fragment_instructions), InstructionsContract.View{

    private lateinit var presenter: InstructionsContract.Presenter
    private lateinit var progressBar: ProgressBar
    private var questionPaperId: String? = null
    private var instructionId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            instructionId = it.getString(INSTRUCTION_ID)
            questionPaperId = it.getString(QUESTION_PAPER_ID)
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        Log.d(TAG," on viewCreated")
        progressBar = ProgressBar(requireActivity())
        presenter = InstructionPresenter(this)

        agreeToGuidelinesCheck.setOnClickListener {
            startTestButton.isEnabled = agreeToGuidelinesCheck.isChecked
        }

        startTestButton.setOnClickListener {
            startActivity(Intent(activity, ExamDrawer::class.java)
                    .putExtra(QUESTION_PAPER_ID,questionPaperId))
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
        fun newInstance(instructionId: String, questionPaperId: String):
                InstructionsFragment {

            return InstructionsFragment().apply {
                arguments = Bundle().apply {
                    putString(INSTRUCTION_ID, instructionId)
                    putString(QUESTION_PAPER_ID, questionPaperId)
                }
            }
        }
    }


}
