package com.testexample.materialdesigntest.ui.TPODashboard

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentTransaction
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_question_paper_list.*


class QuestionPaperListFragment: Fragment(R.layout.fragment_question_paper_list), TPODashboardContract.QuestionPaperListView {

    private lateinit var presenter: TPODashboardContract.QuestionPaperListPresenter
    private var code : Int = 0
    val TAG = "QuestionPaperListFragment"

    @SuppressLint("LongLogTag")
    override fun showQuestionPaperList(questionPapers: List<QuestionPaperListResponse>) {
        Log.d(TAG,"<< showQuestionPaperList()")
        val questionPaperName = ArrayList<String>()
        val questionPaperId = ArrayList<String>()
        val numQuestionPapers = questionPapers.size

        for (i in 0 until numQuestionPapers) {
            questionPaperName.add(questionPapers[i].paper_name)
            questionPaperId.add(questionPapers[i].questionPaperId)

        }

        val listAdapter = QuestionPaperAdapter(this.requireActivity(), questionPaperName, questionPaperId)
        list.adapter = listAdapter

        Log.d(TAG,">> showQuestionPaperList()")
    }

    @SuppressLint("LongLogTag")
    override fun setPresenter(presenter: TPODashboardContract.QuestionPaperListPresenter) {
        Log.d(TAG,"<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG,">> setPresenter()")
    }

    @SuppressLint("LongLogTag")
    override fun setContext(): Context {
        Log.d(TAG,"<< setContext()")
        Log.d(TAG,">> setContext()")
        return this.requireContext()
    }



    @SuppressLint("LongLogTag")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG, "<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)

        arguments?.let {
            code = it.getInt(Constants.CODE)
        }

        presenter = QuestionPaperListPresenter(this)
        presenter .fetchQuestionPaperList(code)

        list.setOnItemClickListener { adapterView, view, position, id ->
            val itemAtPos = adapterView.getItemAtPosition(position)
            val itemIdAtPos = adapterView.getItemIdAtPosition(position)
            val questionPaperId = (view.findViewById(R.id.description) as TextView).text

            requireActivity().supportFragmentManager.beginTransaction()
                    .replace(R.id.questionPaperList, ResultListFragment.newInstance(code, questionPaperId as String))
                    .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE)
                    .addToBackStack("QuestionPaperList")
                    .commit()
        }
        Log.d(TAG, ">> onViewCreated()")
    }
    companion object {
        @JvmStatic
        fun newInstance(code: Int) =
                QuestionPaperListFragment().apply {
                    arguments = Bundle().apply {
                        putInt(Constants.Companion.CODE, code)
                    }
                }
    }

}