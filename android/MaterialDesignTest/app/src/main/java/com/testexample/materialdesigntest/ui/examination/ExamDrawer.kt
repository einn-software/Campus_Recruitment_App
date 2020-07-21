package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.os.CountDownTimer
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.core.view.forEach
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.google.android.material.navigation.NavigationView
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Section
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.network.model.EndExamRequest
import com.testexample.materialdesigntest.data.network.model.FetchExamRequest
import com.testexample.materialdesigntest.ui.ProgressBar
import com.testexample.materialdesigntest.ui.result.ResultActivity
import com.testexample.materialdesigntest.utils.Constants
import com.testexample.materialdesigntest.utils.snackBar
import kotlinx.android.synthetic.main.activity_exam_drawer.*
import kotlinx.android.synthetic.main.appbar.*
import java.util.*
import kotlin.collections.set
import kotlin.properties.Delegates

class ExamDrawer : NavigationView.OnNavigationItemSelectedListener, AppCompatActivity(), ExaminationContract.View {

    val TAG = "EXAM DRAWER"

    private lateinit var currentFragment: ExamSectionFragment
    private var currentItemPosition = 0
    private var previousItem: MenuItem? = null
    private var sectionFragments: MutableMap<Int, ExamSectionFragment> = mutableMapOf()
    private lateinit var progressBar: ProgressBar
    private lateinit var presenter: ExaminationContract.Presenter
    private lateinit var questionPaper: QuestionPaper
    private lateinit var student: Student
    private lateinit var credentials: EndExamRequest
    private var timeLeftInTimer by Delegates.notNull<Long>()
    private lateinit var timer: CountDownTimer
    private var tabCount: Pair<Int, Int> = Pair(0, 0)

    @SuppressLint("RestrictedApi")
    override fun onCreate(savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_exam_drawer)
        setSupportActionBar(appActionBar)
        //get current date
        val calender = Calendar.getInstance()
        val year: Int = calender.get(Calendar.YEAR)
        val month: Int = calender.get(Calendar.MONTH) + 1
        val dayOfMonth: Int = calender.get(Calendar.DAY_OF_MONTH)

        markedForReviewCount.text = getString(R.string.mark_for_review_count, tabCount.first)
        answeredCount.text = getString(R.string.answered, tabCount.second)

        setPresenter(ExaminationPresenter(this))
        progressBar = ProgressBar(this)
        //get data from previous activity
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
        HyperLog.d(TAG, "Question Paper: $questionPaper")

        timeLeftInTimer = (questionPaper.maxTime * 60 * 1000).toLong()

        timer = object : CountDownTimer(timeLeftInTimer, 1000) {
            override fun onFinish() {
                endExam()
            }

            override fun onTick(millisUntilFinished: Long) {
                timeLeftInTimer = millisUntilFinished
                for (id in sectionFragments.keys){
                    if (sectionFragments[id]?.isAdded!!)
                        sectionFragments[id]!!.setClock(timeLeftInTimer)
                }
            }
        }

        val drawerLayout: DrawerLayout = findViewById(R.id.drawer)
        setSupportActionBar(drawerToolbar)
        supportActionBar?.apply {
            setDefaultDisplayHomeAsUpEnabled(true)
            setDisplayHomeAsUpEnabled(false)
        }

        val toggle = object : ActionBarDrawerToggle(
                this, drawerLayout, drawerToolbar,
                R.string.navigation_drawer_open,
                R.string.navigation_drawer_close) {
            override fun onDrawerOpened(drawerView: View) {
                tabCount = currentFragment.getTabCounts()
                markedForReviewCount.text = getString(R.string.mark_for_review_count, tabCount.first)
                answeredCount.text = getString(R.string.answered, tabCount.second)
                super.onDrawerOpened(drawerView)
            }
        }

        toggle.drawerArrowDrawable.color = Color.WHITE
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        onCreateNavigationMenu(questionPaper.sections)
        sectionNavigationView.setNavigationItemSelectedListener(this)
        //Default Page
        onNavigationItemSelected(sectionNavigationView.menu.getItem(0))
        countDownStart(true)

        HyperLog.d(TAG, ">> onCreate")
    }

    private fun onCreateNavigationMenu(sections: List<Section>) {
        HyperLog.d(TAG, "<< onCreateNavigationMenu")
        val menu: Menu = sectionNavigationView.menu

        for (item in 0 until sections.count()) {
            menu.add(item, item, item, sections[item].sectionName)
        }

        HyperLog.d(TAG, ">> onCreateNavigationMenu")
    }

    override fun onNavigationItemSelected(currentItem: MenuItem): Boolean {

        HyperLog.d(TAG, "<< onNavigationItemSelected")
        currentItem.let {
            currentItemPosition = currentItem.order
            drawerToolbar.title = currentItem.title
            showLoading(true)
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
                        sectionFragments[section.itemId]?.let { it1 -> hideFragment(it1) }
                    }
                }
            }

            supportFragmentManager.executePendingTransactions()
            currentFragment = sectionFragments[currentItem.itemId]!!
            showLoading(false)
            currentItem.setChecked(true).setIcon(R.drawable.ic_label_current_black_24dp)
            if (previousItem != currentItem)
                previousItem?.setChecked(false)?.setIcon(R.drawable.ic_visited_24dp)
            previousItem = currentItem
        }
        drawer.closeDrawer(GravityCompat.START)

        HyperLog.d(TAG, ">> onNavigationItemSelected")
        return true
    }

    override fun onBackPressed() {
        HyperLog.d(TAG, "<< onBackPressed")

        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START)
        }
        if (!drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.openDrawer(GravityCompat.START)
        }
        HyperLog.d(TAG, ">> onBackPressed")
    }

    fun moveToNextSection(){
        if (currentItemPosition < sectionNavigationView.childCount - 1) {
            onNavigationItemSelected(sectionNavigationView.menu.getItem(currentItemPosition + 1))
        }
        else
            drawer.snackBar("Please select a section")
    }

    private fun initFragment(fragment: Fragment, tag: String) {

        HyperLog.d(TAG, "<< initFragment")
        supportFragmentManager
                .beginTransaction().apply {
                    if (supportFragmentManager.fragments.size > 0) {
                        hide(supportFragmentManager.fragments[supportFragmentManager.fragments.size - 1])
                    }
                    add(R.id.drawerContainer, fragment, tag)
                    setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                    commit()
                }
        HyperLog.d(TAG, ">> initFragment")
    }

    private fun loadExistingFragment(fragment: Fragment) {
        HyperLog.d(TAG, "<< loadExistingFragment")

        supportFragmentManager.beginTransaction().apply {
            show(fragment)
            setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
            commit()
        }

        HyperLog.d(TAG, ">> loadExistingFragment")
    }

    private fun hideFragment(fragment: Fragment) {
        HyperLog.d(TAG, "<< hideFragment")
        supportFragmentManager.beginTransaction().apply {
            hide(fragment)
            commit()
        }
        HyperLog.d(TAG, ">> hideFragment")
    }

    fun countDownStart(flag: Boolean) {
        HyperLog.d(TAG, "<< countDownStart")
        if (flag) {
            timer.start()
        } else {
            timer.cancel()
            timer.onFinish()
        }
        HyperLog.d(TAG, ">> countDownStart")
    }

    override fun setExamPaper(questionPaper: QuestionPaper) {

        HyperLog.d(TAG, "<< setExamPaper")
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

        HyperLog.d(TAG, ">> setExamPaper")
    }

    override fun showLoading(flag: Boolean) {
        HyperLog.d(TAG, "<< showLoading")
        if (flag) {
            progressBar.startLoading()
        } else
            progressBar.stopLoading()

        HyperLog.d(TAG, ">> showLoading")
    }

    override fun openNextActivity() {
        HyperLog.d(TAG, "<< openNextActivity")
        startActivity(Intent(this, ResultActivity::class.java)
                .apply {
                    flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    putExtra(Constants.CODE, questionPaper.collegeCode)
                    putExtra(Constants.ROLL, student.studentRollNo)
                    putExtra(Constants.QUESTION_PAPER_ID, questionPaper.questionPaperId)
        })
        finish()
        HyperLog.d(TAG, ">> openNextActivity")
    }

    override fun setPresenter(presenter: ExaminationContract.Presenter) {
        this.presenter = presenter
    }

    override fun setContext(): Context {
        return this.baseContext
    }

    override fun onDestroy() {
        presenter.onDestroy()
        HyperLog.d(TAG, "onDestroy()")
        super.onDestroy()
    }

    fun endExam() {
        HyperLog.d(TAG, "<< endExam")
        presenter.endExam(EndExamRequest(questionPaper.questionPaperId, student.studentId))
        HyperLog.d(TAG, ">> endExam")
    }

}
