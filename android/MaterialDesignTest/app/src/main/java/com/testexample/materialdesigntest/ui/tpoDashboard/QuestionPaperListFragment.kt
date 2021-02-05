package com.testexample.materialdesigntest.ui.tpoDashboard

import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.QuestionPaperListResponse
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.activity_tpo_dashboard.*
import kotlinx.android.synthetic.main.fragment_question_paper_list.*


class QuestionPaperListFragment : Fragment(R.layout.fragment_question_paper_list), TPODashboardContract.QuestionPaperListView {

    private lateinit var presenter: TPODashboardContract.QuestionPaperListPresenter
    private var code: Int = 0
    val TAG = "QuestionPaperListFragment"

    override fun showQuestionPaperList(questionPapers: List<QuestionPaperListResponse>) {
        HyperLog.d(TAG, "<< showQuestionPaperList()")
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

        HyperLog.d(TAG, ">> showQuestionPaperList()")
    }

    override fun setPresenter(presenter: TPODashboardContract.QuestionPaperListPresenter) {
        HyperLog.d(TAG, "<< setPresenter()")
        this.presenter = presenter
        HyperLog.d(TAG, ">> setPresenter()")
    }

    override fun setContext(): Context {
        HyperLog.d(TAG, "<< setContext()")
        HyperLog.d(TAG, ">> setContext()")
        return this.requireContext()
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        HyperLog.d(TAG, "<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)

        arguments?.let {
            code = it.getInt(Constants.CODE)
        }

        presenter = QuestionPaperListPresenter(this)
        presenter.fetchQuestionPaperList(code)

        list.setOnItemClickListener { _, view, _, _ ->
            val questionPaperId = (view.findViewById(R.id.questionPaperIdText) as TextView).text
            HyperLog.i(TAG, "Calling ResultList fragment with questionPaperId $questionPaperId and college code is $code")

            requireActivity().supportFragmentManager.beginTransaction().apply {
                replace((requireView().parent as ViewGroup).id, ResultListFragment.newInstance(code, questionPaperId as String),"ResultListFragment")
                addToBackStack("ResultListFragment")
                commit()
            }
        }
        HyperLog.d(TAG, ">> onViewCreated()")
    }

    override fun onDetach() {
        HyperLog.d(TAG, "onDetach")
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