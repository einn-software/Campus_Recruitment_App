package com.innobitsystems.campusrecruiter.ui.examination

import android.app.AlertDialog
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.RadioButton
import android.widget.RadioGroup
import androidx.core.view.get
import androidx.fragment.app.Fragment
import com.google.android.material.tabs.TabLayout
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.model.Options
import com.innobitsystems.campusrecruiter.data.model.Question
import com.innobitsystems.campusrecruiter.data.model.Section
import com.innobitsystems.campusrecruiter.data.network.model.EndExamRequest
import com.innobitsystems.campusrecruiter.data.network.model.StudentAnswerRequest
import com.innobitsystems.campusrecruiter.data.network.model.StudentAnswerResponse
import com.innobitsystems.campusrecruiter.ui.ProgressBar
import com.innobitsystems.campusrecruiter.ui.examination.ExaminationSectionPresenter.Answer
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.fragment_exam.*
import kotlinx.android.synthetic.main.questionview.*

private const val SECTION = "section"
private const val CREDENTIALS = "credentials"

class ExamSectionFragment : Fragment(R.layout.fragment_exam), ExaminationContract.FragmentView {

    private lateinit var currentAnswer: Answer
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
            HyperLog.d(TAG, "default tag called")
        }

        radioGroup.setOnCheckedChangeListener { _: RadioGroup?, checkedId: Int ->
        }

        saveAndNextButton.setOnSingleClickListener {
            HyperLog.d(TAG, "onClick: saveAndNextButton")
            this.sendAnswer(Constants.ANSWERED)
        }

        markReviewButton.setOnSingleClickListener {
            HyperLog.d(TAG, "onClick: markReviewButton")
            if (currentAnswer.state == Constants.MARKED) {
                this.sendAnswer(Constants.UNANSWERED)
                markReviewButton.text = getString(R.string.mark_for_review)
            }
            else{
                this.sendAnswer(Constants.MARKED)
                markReviewButton.text = getString(R.string.unmark)
            }
        }

        exitTestButton.setOnSingleClickListener {
            val builder = AlertDialog.Builder(requireContext(), R.style.AlertDialogTheme)
                    .apply {
                        val markedQuestionsCount = presenter.Q_A_Mapping.values
                            .filter { it.state == Constants.MARKED }.count()
                        val unAnsweredQuestionCount: Int = ((requireActivity() as ExamDrawer)
                            .totalNumberOfQuestions - markedQuestionsCount - presenter.Q_A_Mapping
                            .values.filter { it.state == Constants.ANSWERED }.count())

                        if ( markedQuestionsCount > 0 || unAnsweredQuestionCount > 0){
                            var message = "You have "
                            if (markedQuestionsCount > 0 )
                                message += "$markedQuestionsCount Questions left for review, \n "
                            if (unAnsweredQuestionCount > 0)
                                message +=  "$unAnsweredQuestionCount Questions left unanswered \n "
                            setMessage( message + "\n" + getString(R.string.end_test_message))
                        }
                        else
                            setMessage("You have ${timerText.text} minutes left! \n\n" +
                                    getString(R.string.end_test_message))
                        setCancelable(true)
                        setNegativeButton("Yes") { dialog, _ ->
                            (activity as ExamDrawer).apply {
                                examNotStopped = false
                                countDownStart(false)
                            }
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
        if (state == Constants.UNANSWERED)
            radioGroup.clearCheck()
        val index = questionTab.selectedTabPosition
        val selectedOption = if (radioGroup.checkedRadioButtonId == -1)
            0
        else
            radioGroup.findViewById<RadioButton>(radioGroup.checkedRadioButtonId).tag
        val questionId = questionTab.getTabAt(index)!!.tag.toString()
        val maxMarksForQuestion = section.questionsList[index].marks
        HyperLog.d(TAG, ">> createResponse")
        return StudentAnswerResponse(
                id = currentAnswer.answerSheetId,
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

        if (answer.state == Constants.MARKED)
            markReviewButton.text = getString(R.string.unmark)
        else
            markReviewButton.text = getString(R.string.mark_for_review)

        setTabFlag(answer.state)

        if (answer.optionSelected in 1..4) {
            radioGroup.check(radioGroup[answer.optionSelected - 1].id)
            setTabFlag(answer.state)
        }


        questionNumber.text = getString(R.string.QuestionNum,
                questionTab.getTabAt(viewId)!!.text)
        currentAnswer = answer
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
        return Pair(presenter.Q_A_Mapping.values.filter { it.state == Constants.MARKED }.count(),
            presenter.Q_A_Mapping.values.filter { it.state == Constants.ANSWERED }.count())
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
            //reload last question after submitting answer
            presenter.loadQuestion(questionTab.selectedTabPosition,
                questionTab.getTabAt(questionTab.selectedTabPosition)!!.tag as String)
            requireActivity().onBackPressed()
            (requireActivity() as ExamDrawer).moveToNextSection()
        }
        HyperLog.d(TAG, ">> nextTab()")
    }


    private fun setTabFlag(state: Int){
        when (state){
            Constants.ANSWERED ->
                questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_checked)!!
            Constants.MARKED ->
                questionTab.getTabAt(questionTab.selectedTabPosition)?.setIcon(R.drawable.ic_marked)!!
            Constants.UNANSWERED ->
                questionTab.getTabAt(questionTab.selectedTabPosition)?.icon = null
        }
    }

    override fun onDetach() {
        presenter.onDestroy()
        super.onDetach()
    }

    override fun showLoading(flag: Boolean){
        if (flag)
            progressBar.startLoading()
        else
            progressBar.stopLoading()
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
