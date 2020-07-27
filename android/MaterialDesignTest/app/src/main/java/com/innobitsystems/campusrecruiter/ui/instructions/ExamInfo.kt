package com.innobitsystems.campusrecruiter.ui.instructions

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.R
import com.innobitsystems.campusrecruiter.data.model.QuestionPaper
import com.innobitsystems.campusrecruiter.data.model.Student
import com.innobitsystems.campusrecruiter.data.network.model.AuthResponse
import com.innobitsystems.campusrecruiter.data.session.SessionManager
import com.innobitsystems.campusrecruiter.ui.ProgressBar
import com.innobitsystems.campusrecruiter.ui.login.LoginActivity
import com.innobitsystems.campusrecruiter.ui.result.ResultActivity
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.setOnSingleClickListener
import kotlinx.android.synthetic.main.fragment_exam_info.*
import java.util.*

class ExamInfo : Fragment(R.layout.fragment_exam_info), InstructionsContract.ExamInfoView {

    private lateinit var instructionsFragment: InstructionsFragment
    private lateinit var presenter: InstructionsContract.ExamInfoPresenter
    private lateinit var progressBar: ProgressBar
    val TAG = "ExamInfo"
    private  var student: Student? = null
    private  var questionPaper: QuestionPaper? = null
    override var resultAvailable: Boolean = false
    private lateinit var sessionManager: SessionManager

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        HyperLog.d(TAG, "<< onViewCreated")

        progressBar = ProgressBar(requireActivity())
        val calender = Calendar.getInstance()
        val year: Int = calender.get(Calendar.YEAR)
        val month: Int = calender.get(Calendar.MONTH) + 1
        val dayOfMonth: Int = calender.get(Calendar.DAY_OF_MONTH)
        presenter = ExamInfoPresenter(this)
        HyperLog.d(TAG, "Current Date is $dayOfMonth / $month / $year")
        presenter.fetchCollegeCode(year, month, dayOfMonth)
        sessionManager = SessionManager(requireContext())


        availableExamsTab.setOnSingleClickListener {
            if (questionPaper == null){
                startActivity(Intent(activity, LoginActivity::class.java).apply {
                   flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
                requireActivity().finish()
            }
            else if (resultAvailable){
                HyperLog.d(TAG, "<< openNextActivity")
                startActivity(Intent(requireContext(), ResultActivity::class.java)
                    .apply {
                        flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                        putExtra(Constants.CODE, questionPaper?.collegeCode)
                        putExtra(Constants.ROLL, student?.studentRollNo)
                        putExtra(Constants.QUESTION_PAPER_ID, questionPaper?.questionPaperId)
                    })
                requireActivity().finish()
                HyperLog.d(TAG, ">> openNextActivity")
            }
            else
                openNextFragment(this.questionPaper!!, presenter.student)
        }

        studentLogout.setOnClickListener {
            sessionManager.saveUserSession(AuthResponse(null, null, null, null))
            val i = Intent(requireActivity(), LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            startActivity(i)
            requireActivity().finish()
        }
        HyperLog.d(TAG, ">> onViewCreated")
    }

    override fun showExamInfo(questionPaper: QuestionPaper?) {
        HyperLog.d(TAG, "<< showExamInfo")
        val message: String

        if (null == questionPaper) {
            message = Constants.NO_EXAM_FOUND
        } else {
            message = "Your Exam for " + questionPaper.questionPaperName
            student = presenter.student
            this.questionPaper = questionPaper
        }
        availableExamsTabText.text = message
        HyperLog.d(TAG, ">> showExamInfo")
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

        HyperLog.d(TAG, ">> openNextFragment")
    }

    override fun showLoading(flag: Boolean) {
        HyperLog.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else {
            progressBar.stopLoading()
        }
        HyperLog.d(TAG, ">> openNextFragment")
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
