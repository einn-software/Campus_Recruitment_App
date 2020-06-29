package com.testexample.materialdesigntest.ui.tpoDashboard

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.fragment_question_paper_list.*


class QuestionPaperListFragment : Fragment(R.layout.fragment_question_paper_list), TPODashboardContract.QuestionPaperListView {

    private lateinit var presenter: TPODashboardContract.QuestionPaperListPresenter
    private var code: Int = 0
    val TAG = "QuestionPaperListFragment"

    @SuppressLint("LongLogTag")
    override fun showQuestionPaperList(questionPapers: List<QuestionPaperListResponse>) {
        Log.d(TAG, "<< showQuestionPaperList()")
        val questionPaperName = ArrayList<String>()
        val questionPaperId = ArrayList<String>()
        val questionPaperDate = ArrayList<String>()
        val numQuestionPapers = questionPapers.size

        for (i in 0 until numQuestionPapers) {
            questionPaperName.add(questionPapers[i].paper_name)
            questionPaperId.add(questionPapers[i].questionPaperId)
            questionPaperDate.add(questionPapers[i].day.toString()+"-"+questionPapers[i].month.toString()+"-"+questionPapers[i].year.toString())
        }

        val listAdapter = QuestionPaperAdapter(this.requireActivity(), questionPaperName, questionPaperId, questionPaperDate)
        list.adapter = listAdapter

        Log.d(TAG, ">> showQuestionPaperList()")
    }

    @SuppressLint("LongLogTag")
    override fun setPresenter(presenter: TPODashboardContract.QuestionPaperListPresenter) {
        Log.d(TAG, "<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG, ">> setPresenter()")
    }

    @SuppressLint("LongLogTag")
    override fun setContext(): Context {
        Log.d(TAG, "<< setContext()")
        Log.d(TAG, ">> setContext()")
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
        presenter.fetchQuestionPaperList(code)

        list.setOnItemClickListener { _, view, _, _ ->
            val questionPaperId = (view.findViewById(R.id.questionPaperIdText) as TextView).text
            Log.i(TAG, "Calling ResultList fragment with questionPaperId $questionPaperId and college code is $code")

            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace((requireView().parent as ViewGroup).id, ResultListFragment.newInstance(code, questionPaperId as String),"ResultListFragment")
                addToBackStack("ResultListFragment")
                commit()
            }
        }
        Log.d(TAG, ">> onViewCreated()")
    }

    @SuppressLint("LongLogTag")
    override fun onDetach() {
        Log.d(TAG, "onDetach")
        super.onDetach()
        requireActivity().tpoDashboardContainer.visibility = View.VISIBLE
    }

    companion object {
        @JvmStatic
        fun newInstance(code: Int) =
                QuestionPaperListFragment().apply {
                    arguments = Bundle().apply {
                        putInt(Constants.CODE, code)
                    }
                }
    }

}