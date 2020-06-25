package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.CountDownTimer
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.core.view.forEach
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.google.android.material.navigation.NavigationView
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionsList
import com.testexample.materialdesigntest.data.model.Section
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.result.ResultActivity
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.activity_exam_drawer.*
import kotlinx.android.synthetic.main.appbar.*
import kotlinx.android.synthetic.main.drawer_header.*
import org.jetbrains.anko.contentView
import org.w3c.dom.Text
import java.util.*
import kotlin.properties.Delegates

class ExamDrawer : NavigationView.OnNavigationItemSelectedListener, AppCompatActivity(), ExaminationContract.View {

    val TAG = "EXAM DRAWER"

    private var sectionFragments: MutableMap<Int, ExamSectionFragment> = mutableMapOf()
    private lateinit var progressBar: ProgressBar
    private lateinit var presenter: ExaminationContract.Presenter
    private lateinit var questionPaper: QuestionPaper
    private lateinit var student: Student
    private lateinit var credentials: EndExamRequest
    private lateinit var activeFragment: ExamSectionFragment
    private var timeLeftInTimer by Delegates.notNull<Long>()
    private lateinit var timer: CountDownTimer

    @SuppressLint("RestrictedApi")
    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_exam_drawer)
        setSupportActionBar(appActionBar)

        val calender = Calendar.getInstance()
        val year: Int = calender.get(Calendar.YEAR)
        val month: Int = calender.get(Calendar.MONTH)
        val dayOfMonth: Int = calender.get(Calendar.DAY_OF_MONTH)

        setPresenter(ExaminationPresenter(this))

        val bundle: Bundle? = intent.extras
        questionPaper = bundle?.getParcelable(Constants.QUESTION_PAPER)!!
        student = bundle.getParcelable(Constants.STUDENT)!!

        credentials = EndExamRequest(questionPaper.questionPaperId,
                student.studentId)

        if (!questionPaper.instructionId.isBlank()) {
            setExamPaper(questionPaper)
        } else {
            presenter.loadExam(FetchExamRequest(student.studentCollegeCode,
                    year, month, dayOfMonth))
        }

        timeLeftInTimer = (questionPaper.maxTime * 60 * 1000).toLong()

        val drawerLayout: DrawerLayout = findViewById(R.id.drawer)
        setSupportActionBar(drawerToolbar)
        supportActionBar?.apply {
            setDefaultDisplayHomeAsUpEnabled(true)
            setDisplayHomeAsUpEnabled(false)
        }

        val toggle = ActionBarDrawerToggle(
                this, drawerLayout, drawerToolbar,
                R.string.navigation_drawer_open,
                R.string.navigation_drawer_close)

        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        onCreateNavigationMenu(questionPaper.sections)
        sectionNavigationView.setNavigationItemSelectedListener(this)
        //Default Page
        onNavigationItemSelected(sectionNavigationView.menu.getItem(0).setChecked(true))

        Log.d(TAG, ">> onCreate")
    }

    private fun onCreateNavigationMenu(sections: List<Section>) {
        Log.d(TAG, "<< onCreateNavigationMenu")
        val menu: Menu = sectionNavigationView.menu

        for (item in 0 until sections.count()) {
            menu.add(0, item, item, sections[item].sectionName)
        }

        Log.d(TAG, ">> onCreateNavigationMenu")
    }

    override fun onNavigationItemSelected(currentItem: MenuItem): Boolean {

        Log.d(TAG, "<< onNavigationItemSelected")

        currentItem.let {
            if (supportFragmentManager
                            .findFragmentByTag(currentItem.title.toString()) == null) {
                if (!sectionFragments.containsKey(currentItem.itemId)) {

                    sectionFragments[currentItem.itemId] = ExamSectionFragment
                            .newInstance(questionPaper.sections[currentItem.itemId], credentials)

                    initFragment(sectionFragments[currentItem.itemId]!!, currentItem.title.toString())
                }
            } else {
                loadExistingFragment(sectionFragments[currentItem.itemId]!!)
                sectionNavigationView.menu.forEach { section ->
                    if (section.itemId != currentItem.itemId &&
                            sectionFragments[currentItem.itemId] != null) {
                        hideFragment(sectionFragments[section.itemId]!!)
                    }
                }
            }

            supportFragmentManager.executePendingTransactions()
            activeFragment = sectionFragments[currentItem.itemId]!!
        }
        drawer.closeDrawer(GravityCompat.START)
        true.countDownStart()

        Log.d(TAG, ">> onNavigationItemSelected")
        return true
    }

    override fun onBackPressed() {
        Log.d(TAG, "<< onBackPressed")

        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START)
        }
        if (!drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.openDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
        Log.d(TAG, ">> onBackPressed")
    }

    private fun initFragment(fragment: Fragment, tag: String) {

        Log.d(TAG, "<< initFragment")

        supportFragmentManager
                .beginTransaction().apply {
                    if (supportFragmentManager.fragments.size > 0) {
                        hide(supportFragmentManager.fragments[supportFragmentManager.fragments.size - 1])
                    }
                    add(R.id.drawerContainer, fragment, tag)
                    setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                    commit()
                }
        Log.d(TAG, ">> initFragment")
    }

    private fun loadExistingFragment(fragment: Fragment) {
        Log.d(TAG, "<< loadExistingFragment")

        supportFragmentManager.beginTransaction().apply {
            show(fragment)
            setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
            commit()
        }

        Log.d(TAG, ">> loadExistingFragment")
    }

    private fun hideFragment(fragment: Fragment) {
        Log.d(TAG, "<< hideFragment")
        supportFragmentManager.beginTransaction().apply {
            hide(fragment)
            commit()
        }
        Log.d(TAG, ">> hideFragment")
    }

    private fun Boolean.countDownStart() {

        Log.d(TAG, "<< countDownStart")

        if (this) {
            timer = object : CountDownTimer(timeLeftInTimer, 1000) {
                override fun onFinish() {
                    endExam()
                }

                override fun onTick(millisUntilFinished: Long) {
                    timeLeftInTimer = millisUntilFinished
                    activeFragment.setClock(timeLeftInTimer)
                }
            }.start()
        } else {
            timer.cancel()
        }
        Log.d(TAG, ">> countDownStart")
    }

    override fun setExamPaper(questionPaper: QuestionPaper) {

        Log.d(TAG, "<< setExamPaper")
        val headerView = sectionNavigationView.getHeaderView(0)

        headerView.findViewById<TextView>(R.id.studentNameText)
                .text = student.studentName
        headerView.findViewById<TextView>(R.id.studentCollegeCodeText)
                .text = getString(R.string.college_code,
                questionPaper.collegeCode.toString())
        headerView.findViewById<TextView>(R.id.studentRollNoText)
                .text = student.studentRollNo
        headerView.findViewById<TextView>(R.id.maxMarksText)
                .text = getString(R.string.question_paper_max_marks,
                questionPaper.maxMarks)

        Log.d(TAG, ">> setExamPaper")
    }

    override fun showLoading(flag: Boolean) {
        Log.d(TAG, "<< showLoading")

        if (flag) {
            progressBar = ProgressBar(this)
            progressBar.setLoadingText("Time is Over, Please Wait While Result is loaded")
            setContentView(R.layout.activity_exam_drawer)
            progressBar.startLoading()
        } else
            progressBar.stopLoading()

        Log.d(TAG, ">> showLoading")
    }

    override fun openNextActivity() {
        Log.d(TAG, "<< openNextActivity")
        startActivity(Intent(this, ResultActivity::class.java))
        Log.d(TAG, ">> openNextActivity")
    }

    override fun setPresenter(presenter: ExaminationContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.baseContext
    }

    fun endExam() {
        Log.d(TAG, "<< endExam")
        presenter.endExam(EndExamRequest(questionPaper.questionPaperId, student.studentId))
        Log.d(TAG, ">> endExam")
    }
}
