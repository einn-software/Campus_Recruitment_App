package com.innobitsystems.campusrecruiter.ui.instructions

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.method.ScrollingMovementMethod
import android.text.style.BulletSpan
import android.view.View
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.model.Instructions
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.model.Student
import com.innobitsystems.campusrecruiter.ui.ProgressBar
import com.innobitsystems.campusrecruiter.ui.examination.ExamDrawer
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import com.innobitsystems.campusrecruiter.utils.snackBar
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

        startTestButton.setOnSingleClickListener {
            if (agreeToGuidelinesCheck.isChecked) {
                progressBar.startLoading()
                startActivity(Intent(activity, ExamDrawer::class.java)
                    .apply {
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                        putExtra(Constants.QUESTION_PAPER, questionPaper)
                        putExtra(Constants.STUDENT, student)
                    })
                requireActivity().finish()
            }
            else
                instructionsFragmentLayout.snackBar("Please check \"Agree to guidelines\"  first!")

        }
        HyperLog.d(TAG,">> onViewCreated")
    }

    override fun showInstructions(instruction: Instructions) {
        HyperLog.d(TAG,"<< showInstructions")
        val message = instruction.message
        val listBuilder = SpannableStringBuilder()
        message.split(".").forEach{
            if (it.isNotBlank())
                listBuilder.append(
                    "$it.\n\n",
                    BulletSpan(),
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
                )
        }
        guidelinesText.text = listBuilder
        guidelinesText.movementMethod = ScrollingMovementMethod()
        HyperLog.d(TAG,">> showInstructions")
    }

    override fun setPresenter(presenter: InstructionsContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.requireContext()
    }

    override fun onDestroy() {
        progressBar.stopLoading()
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
