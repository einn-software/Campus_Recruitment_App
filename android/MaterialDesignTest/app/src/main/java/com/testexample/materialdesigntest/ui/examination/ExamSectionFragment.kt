package com.testexample.materialdesigntest.ui.examination

import android.app.AlertDialog
import android.content.Context
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.RadioButton
import androidx.annotation.RequiresApi
import androidx.core.view.get
import androidx.fragment.app.Fragment
import com.google.android.material.tabs.TabLayout
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Options
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.Section
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.ui.examination.ExaminationSectionPresenter.Answer
import kotlinx.android.synthetic.main.fragment_exam.*
import kotlinx.android.synthetic.main.questionview.*

private const val SECTION = "section"
private const val CREDENTIALS = "credentials"

class ExamSectionFragment : Fragment(R.layout.fragment_exam), ExaminationContract.FragmentView {

    private lateinit var currentAnswerId: String
    val TAG = "Exam Section Fragment " + this.tag
    private lateinit var section: Section
    private lateinit var studentCredential: EndExamRequest
    private lateinit var presenter: ExaminationContract.FragmentPresenter

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        arguments?.let {
            section = it.getParcelable(SECTION)!!
            studentCredential = it.getParcelable(CREDENTIALS)!!
        }
        Log.d(TAG, ">> onCreate")
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onViewCreated")
        super.onViewCreated(view, savedInstanceState)
        setPresenter(ExaminationSectionPresenter(this))
        presenter.loadAnswerSheet(studentCredential)

        for ((index, question) in section.questionsList.withIndex()) {
            questionTab.addTab(questionTab.newTab()
                    .setText((index + 1).toString())
                    .setTag(question.questionId))
            // tab tag is assigned the question id
        }

        questionTab.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {
            }

            override fun onTabUnselected(tab: TabLayout.Tab?) {
            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                val index = tab!!.position
                Log.d(TAG, "tab called is $index")
                presenter.loadQuestion(index, tab.tag as String)
                questionMMarks.text = getString(R.string.m_m,
                        section
                                .questionsList[index]
                                .marks)
            }
        })

        kotlin.run {
            questionTab.selectTab(questionTab.getTabAt(0))
            presenter.loadQuestion(0, questionTab.getTabAt(0)!!.tag as String)
            questionMMarks.text = getString(R.string.m_m,
                    section
                            .questionsList[0]
                            .marks)
            Log.d(TAG, "default tag called")
        }

        radioGroup.setOnCheckedChangeListener { _, checkedId ->
            saveAndNextButton.isEnabled = checkedId != -1
            markReviewButton.isEnabled = checkedId != -1
        }

        saveAndNextButton.setOnClickListener {
            this.sendAnswer(4)
        }

        markReviewButton.setOnClickListener {
            this.sendAnswer(5)
        }

        exitTestButton.setOnClickListener {
            val builder = AlertDialog.Builder(requireContext())
                    .apply {
                        setMessage(getString(R.string.end_test_message))
                        setCancelable(true)
                        setNegativeButton("Yes") { dialog, _ ->
                            timerText.text = getString(R.string.timer)
                            (activity as ExamDrawer).endExam()
                            dialog!!.cancel()
                        }
                        setPositiveButton("No!") { dialog, _ -> dialog!!.dismiss() }
                    }
            val alertForEndingExam = builder.create()
            alertForEndingExam.show()
        }

        Log.d(TAG, ">> onViewCreated")
    }

    override fun createResponse(state: Int): StudentAnswerResponse {
        Log.d(TAG, "<< createResponse")
        val index = questionTab.selectedTabPosition
        val selectedOption = (radioGroup.checkedRadioButtonId + 1) % radioGroup[0].id
        val questionId = questionTab.getTabAt(index)!!.tag.toString()
        val maxMarksForQuestion = section.questionsList[index].marks
        Log.d(TAG, ">> createResponse")
        return StudentAnswerResponse(
                id = currentAnswerId,
                studentAnswer = StudentAnswerRequest(
                        studentId = studentCredential.studentId,
                        questionId = questionId,
                        selectedOption = selectedOption,
                        questionPaperId = studentCredential.questionPaperId,
                        state = state,
                        questionMaxMarks = maxMarksForQuestion
                )
        )
    }

    override fun setQuestion(viewId: Int, question: Question, answer: Answer) {
        Log.d(TAG, "<< setQuestion")
        radioGroup.clearCheck()
        this.questionText.text = question.questionText
        setOptions(radioButton1, question.options[0])
        setOptions(radioButton2, question.options[1])
        setOptions(radioButton3, question.options[2])
        setOptions(radioButton4, question.options[3])

        if (answer.optionSelected in 1..4) {
            radioGroup.check(radioGroup[answer.optionSelected - 1].id)
        }


        questionNumber.text = getString(R.string.QuestionNum,
                questionTab.getTabAt(viewId)!!.text)
        currentAnswerId = answer.answerSheetId
        Log.d(TAG, ">> setQuestion")
    }

    override fun setPresenter(presenter: ExaminationContract.FragmentPresenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return requireContext()
    }

    private fun setOptions(radioButton: RadioButton, option: Options) {
        Log.d(TAG, "<< setOptions")
        radioButton.apply {
            text = option.option
            tag = option.index
        }
        Log.d(TAG, ">> setOptions")
    }

    private fun sendAnswer(state: Int) {
        Log.d(TAG, "<< sendAnswer")
        val answerResponse = createResponse(state)
        presenter.saveResponse(answerResponse)
        Log.d(TAG, ">> sendAnswer")
    }

    fun setClock(timeLeftInTimer: Long) {
        val minutes = (timeLeftInTimer / 60000).toInt()
        val seconds = ((timeLeftInTimer % 60000) / 1000).toInt()
        var timeLeftText: String = ""
        timeLeftText += "$minutes:"

        if (seconds < 10) {
            timeLeftText += "0"
        }

        timeLeftText += seconds.toString()
        timerText.text = timeLeftText
    }

    override fun markTabAndMoveNext(state: Int) {
        Log.d(TAG, "<< nextTab()")
        when (state){
            4 -> questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_attempted)!!
            5 -> questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_marked_for_review)!!
        }
        if (questionTab.selectedTabPosition < questionTab.tabCount - 1)
            questionTab.selectTab(questionTab.getTabAt(questionTab.selectedTabPosition + 1))
        Log.d(TAG, ">> nextTab()")
    }

    override fun onResume() {
        Log.d(TAG, "<< onResume")
        super.onResume()
        Log.d(TAG, ">> onResume")
    }

    companion object {
        @JvmStatic
        fun newInstance(section: Section, credentials: EndExamRequest) =
                ExamSectionFragment().apply {
                    arguments = Bundle().apply {
                        putParcelable(SECTION, section)
                        putParcelable(CREDENTIALS, credentials)
                    }
                }
    }
}
