package com.testexample.materialdesigntest.ui.examination

import android.annotation.SuppressLint
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.google.android.material.navigation.NavigationView
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.activity_exam_drawer.*

class ExamDrawer : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    val TAG = "EXAM DRAWER"

    lateinit var section1Fragment: ExamSectionFragment
    lateinit var section2Fragment: ExamSectionFragment
    lateinit var section3Fragment: ExamSectionFragment

    @SuppressLint("RestrictedApi")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_exam_drawer)

        val drawerLayout: DrawerLayout = findViewById(R.id.drawer)
        setSupportActionBar(drawerToolbar)
        supportActionBar?.apply {
            setDefaultDisplayHomeAsUpEnabled(true)
            setDisplayHomeAsUpEnabled(false)
        }
        var toggle = ActionBarDrawerToggle(
            this, drawerLayout, drawerToolbar,
            R.string.navigation_drawer_open,
            R.string.navigation_drawer_close)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()
        sectionNavigationView.setNavigationItemSelectedListener(this)
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when(item.itemId) {
            R.id.section1 -> {
                if (supportFragmentManager.findFragmentByTag("section1") == null)
                {
                    section1Fragment = ExamSectionFragment.newInstance("1", "param2")
                    initFragment(section1Fragment, "section1")
                }
                else
                {
                    loadExistingFragment(section1Fragment)
                    if (supportFragmentManager.findFragmentByTag("section2") != null) {
                        hideFragment(supportFragmentManager.findFragmentByTag("section2")!!)
                    }
                    if (supportFragmentManager.findFragmentByTag("section3") != null) {
                        hideFragment(supportFragmentManager.findFragmentByTag("section3")!!)
                    }
                }
            }

            R.id.section2 -> {
                if (supportFragmentManager.findFragmentByTag("section2") == null)
                {
                    section2Fragment = ExamSectionFragment.newInstance("2", "param2")
                    initFragment(section2Fragment, "section2")
                }
                else
                {
                    loadExistingFragment(section2Fragment)
                    if (supportFragmentManager.findFragmentByTag("section1") != null) {
                        hideFragment(supportFragmentManager.findFragmentByTag("section1")!!)
                    }
                    if (supportFragmentManager.findFragmentByTag("section3") != null) {
                        hideFragment(supportFragmentManager.findFragmentByTag("section3")!!)
                    }
                }
            }

            R.id.section3 -> {
                if (supportFragmentManager.findFragmentByTag("section3") == null)
                {
                    section3Fragment = ExamSectionFragment.newInstance("3", "param2")
                    initFragment(section3Fragment, "section3")
                }
                else
                {
                    loadExistingFragment(section3Fragment)
                    if (supportFragmentManager.findFragmentByTag("section1") != null) {
                        hideFragment(supportFragmentManager.findFragmentByTag("section1")!!)
                    }
                    if (supportFragmentManager.findFragmentByTag("section2") != null) {
                    hideFragment(supportFragmentManager.findFragmentByTag("section2")!!)
                    }
                }
            }
        }
        drawer.closeDrawer(GravityCompat.START)
        return true
    }

    override fun onBackPressed() {
        Log.d(TAG, "onBackPressed")
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START)
        }
        if (!drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.openDrawer(GravityCompat.START)
        }
        else {
            super.onBackPressed()
        }
    }

    private fun initFragment(fragment: Fragment, tag: String) {
        supportFragmentManager
            .beginTransaction().apply {
                if (supportFragmentManager.fragments.size > 0)
                {
                    hide(supportFragmentManager.fragments[supportFragmentManager.fragments.size - 1])
                }
                add(R.id.drawerContainer, fragment, tag)
                setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                commit()
            }

    }


    private fun loadExistingFragment(fragment: Fragment) {
        supportFragmentManager
            .beginTransaction().apply {
                show(fragment)
                setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                commit()
            }
    }

    private fun hideFragment(fragment: Fragment) {
            supportFragmentManager.beginTransaction().apply {
                hide(fragment)
                commit()
            }
    }
}
