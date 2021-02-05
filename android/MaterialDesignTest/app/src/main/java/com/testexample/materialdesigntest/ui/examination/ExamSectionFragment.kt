package com.testexample.materialdesigntest.ui.examination

import android.app.AlertDialog
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.RadioButton
import androidx.core.view.get
import androidx.fragment.app.Fragment
import com.google.android.material.tabs.TabLayout
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.Options
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.Section
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerRequest
import com.testexample.materialdesigntest.data.network.model.StudentAnswerResponse
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.examination.ExaminationSectionPresenter.Answer
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.snackBar
import kotlinx.android.synthetic.main.activity_exam_drawer.*
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
    private lateinit var progressBar: ProgressBar

    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        arguments?.let {
            section = it.getParcelable(SECTION)!!
            studentCredential = it.getParcelable(CREDENTIALS)!!
        }
        progressBar = ProgressBar(requireActivity())
        HyperLog.d(TAG, ">> onCreate")
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onViewCreated")
        super.onViewCreated(view, savedInstanceState)
        setPresenter(ExaminationSectionPresenter(this))
        presenter.loadAnswerSheet(studentCredential)
        progressBar.startLoading()

        for ((index, question) in section.questionsList.withIndex()) {
            HyperLog.d(TAG, "setTag")
            questionTab.addTab(questionTab.newTab()
                    .setText((index + 1).toString())
                    .setTag(question.questionId))
            if (presenter.Q_A_Mapping.containsKey(question.questionId)){
                when(presenter.Q_A_Mapping[question.questionId]?.state){
                    Constants.MARKED -> questionTab.getTabAt(index)?.setIcon(R.drawable.ic_marked)
                    Constants.ANSWERED -> questionTab.getTabAt(index)?.setIcon(R.drawable.ic_checked)
                }
            }
            // tab tag is assigned the question id
        }

        questionTab.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabReselected(tab: TabLayout.Tab?) {
            }

            override fun onTabUnselected(tab: TabLayout.Tab?) {
            }

            override fun onTabSelected(tab: TabLayout.Tab?) {
                val index = tab!!.position
                HyperLog.d(TAG, "tab called is $index")
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
            progressBar.stopLoading()
            HyperLog.d(TAG, "default tag called")
        }

        radioGroup.setOnCheckedChangeListener { _, checkedId ->
            saveAndNextButton.isEnabled = checkedId != -1
            markReviewButton.isEnabled = checkedId != -1
        }

        saveAndNextButton.setOnClickListener {
            HyperLog.d(TAG, "onClick: saveAndNextButton")
            this.sendAnswer(4)
        }

        markReviewButton.setOnClickListener {
            HyperLog.d(TAG, "onClick: markReviewButton")
            this.sendAnswer(5)
        }

        exitTestButton.setOnClickListener {
            val builder = AlertDialog.Builder(requireContext(), R.style.AlertDialogTheme)
                    .apply {
                        val markedQuestionsCount = presenter.Q_A_Mapping.values.filter { it.state == 5 }.count()
                        if ( markedQuestionsCount > 0 ){
                            setMessage("You have $markedQuestionsCount Questions Left for Review! " +
                                    "\n\n" + getString(R.string.end_test_message))
                        }
                        else
                            setMessage("You have ${timerText.text} Minutes left! \n\n" +
                                    getString(R.string.end_test_message))
                        setCancelable(true)
                        setNegativeButton("Yes") { dialog, _ ->
                            (activity as ExamDrawer).countDownStart(false)

                            dialog!!.cancel()
                        }
                        setPositiveButton("No!") { dialog, _ -> dialog!!.dismiss() }
                    }
            val alertForEndingExam = builder.create()
            alertForEndingExam.show()
        }

        HyperLog.d(TAG, ">> onViewCreated")
    }

    override fun createResponse(state: Int): StudentAnswerResponse {
        HyperLog.d(TAG, "<< createResponse")
        val index = questionTab.selectedTabPosition
        val selectedOption = radioGroup.findViewById<RadioButton>(radioGroup.checkedRadioButtonId).tag
        val questionId = questionTab.getTabAt(index)!!.tag.toString()
        val maxMarksForQuestion = section.questionsList[index].marks
        HyperLog.d(TAG, ">> createResponse")
        return StudentAnswerResponse(
                id = currentAnswerId,
                studentAnswer = StudentAnswerRequest(
                        studentId = studentCredential.studentId,
                        questionId = questionId,
                        selectedOption = selectedOption as Int,
                        questionPaperId = studentCredential.questionPaperId,
                        state = state,
                        questionMaxMarks = maxMarksForQuestion
                )
        )
    }

    override fun setQuestion(viewId: Int, question: Question, answer: Answer) {
        HyperLog.d(TAG, "<< setQuestion ")
        radioGroup.clearCheck()
        this.questionText.text = question.questionText
        setOptions(radioButton1, question.options[0])
        setOptions(radioButton2, question.options[1])
        setOptions(radioButton3, question.options[2])
        setOptions(radioButton4, question.options[3])

        if (answer.optionSelected in 1..4) {
            radioGroup.check(radioGroup[answer.optionSelected - 1].id)
            setTabFlag(answer.state)
        }


        questionNumber.text = getString(R.string.QuestionNum,
                questionTab.getTabAt(viewId)!!.text)
        currentAnswerId = answer.answerSheetId
        HyperLog.d(TAG, ">> setQuestion")
    }

    override fun setPresenter(presenter: ExaminationContract.FragmentPresenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return requireContext()
    }

    override fun onDestroy() {
        presenter.onDestroy()
        super.onDestroy()
    }

    private fun setOptions(radioButton: RadioButton, option: Options) {
        HyperLog.d(TAG, "<< setOptions")
        radioButton.apply {
            text = option.option
            tag = option.index
        }
        HyperLog.d(TAG, ">> setOptions")
    }

    private fun sendAnswer(state: Int) {
        HyperLog.d(TAG, "<< sendAnswer: with state: $state")
        val answerResponse = createResponse(state)
        presenter.saveResponse(answerResponse)
        HyperLog.d(TAG, ">> sendAnswer")
    }

    fun getTabCounts(): Pair<Int, Int> {
        return Pair(presenter.Q_A_Mapping.count { it.value.state == Constants.MARKED },
            presenter.Q_A_Mapping.count{ it.value.state == Constants.ANSWERED})
    }

    fun setClock(timeLeftInTimer: Long) {
        if (timeLeftInTimer > 0) {
            val minutes = (timeLeftInTimer / 60000).toInt()
            val seconds = ((timeLeftInTimer % 60000) / 1000).toInt()
            var timeLeftText = ""
            timeLeftText += "$minutes:"

            if (seconds < 10) {
                timeLeftText += "0"
            }

            if (minutes < 10){
                timerText.setTextColor(Color.RED)
            }

            timeLeftText += seconds.toString()
            timerText.text = timeLeftText
        }
        else
            timerText.text = getString(R.string.timer)
    }

    override fun markTabAndMoveNext(state: Int) {
        HyperLog.d(TAG, "<< nextTab(): incoming state for Previous Tab: $state")
        setTabFlag(state)
        if (questionTab.selectedTabPosition < questionTab.tabCount - 1)
            questionTab.selectTab(questionTab.getTabAt(questionTab.selectedTabPosition + 1))
        else {
            presenter.loadQuestion(questionTab.selectedTabPosition, questionTab.getTabAt(questionTab.selectedTabPosition)!!.tag as String)
            requireActivity().onBackPressed()
            requireActivity().drawer.snackBar("Please select a section")

        }
        HyperLog.d(TAG, ">> nextTab()")
    }


    private fun setTabFlag(state: Int){
        when (state){
            Constants.ANSWERED ->
                questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_checked)!!
            Constants.MARKED ->
                questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_marked)!!
        }
    }

    override fun onDetach() {
        presenter.onDestroy()
        super.onDetach()
    }

    override fun onResume() {
        HyperLog.d(TAG, "<< onResume")
        super.onResume()
        HyperLog.d(TAG, ">> onResume")
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
