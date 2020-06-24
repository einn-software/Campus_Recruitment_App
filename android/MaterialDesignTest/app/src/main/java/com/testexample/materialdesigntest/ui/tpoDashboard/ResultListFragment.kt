package com.testexample.materialdesigntest.ui.tpoDashboard

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.View
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TableRow.LayoutParams
import android.widget.TextView
import androidx.annotation.NonNull
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.testexample.materialdesigntest.R
import com.testexample.materialdesigntest.data.network.model.CollegeWiseResultResponse
import com.testexample.materialdesigntest.utils.Constants
import kotlinx.android.synthetic.main.fragment_result_list.*
import java.util.*


class ResultListFragment: Fragment(R.layout.fragment_result_list), TPODashboardContract.ResultListView{

    val TAG = "ResultListFragment"
    private lateinit var presenter: TPODashboardContract.ResultListPresenter
    private var code: Int = 0
    private var questionPaperId: String =  ""

    override fun setPresenter(presenter: TPODashboardContract.ResultListPresenter) {
        Log.d(TAG,"<< setPresenter()")
        this.presenter = presenter
        Log.d(TAG,">> setPresenter()")
    }

    override fun setContext(): Context {
        Log.d(TAG,"<< setContext()")
        Log.d(TAG,">> setContext()")
        return this.requireContext()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        Log.d(TAG,"<< onViewCreated()")
        super.onViewCreated(view, savedInstanceState)

        arguments?.let {
            code = it.getInt(Constants.CODE)
            questionPaperId = it.getString(Constants.QUESTION_PAPER_ID).toString()
        }

        presenter = ResultListPresenter(this)
        presenter .fetchResultList(code, questionPaperId)

        Log.d(TAG,">> onViewCreated()")
    }


    companion object {
        @JvmStatic
        fun newInstance(code: Int, questionPaperId: String) =
                ResultListFragment().apply {
                    arguments = Bundle().apply {
                        putInt(Constants.CODE,code)
                        putString(Constants.QUESTION_PAPER_ID,questionPaperId)
                    }
                }
    }

    private fun getTextView(id: Int, title: String, color: Int, typeface: Int, bgColor: Int): TextView? {
        val tv = TextView(this.context)
        tv.id = id
        tv.text = title.toUpperCase(Locale.ROOT)
        tv.gravity = Gravity.CENTER_VERTICAL or Gravity.CENTER_HORIZONTAL
        tv.setTextColor(color)
        tv.setPadding(40, 40, 40, 40)
        tv.setTypeface(Typeface.DEFAULT, typeface)
        tv.setBackgroundColor(bgColor)
        tv.layoutParams = getLayoutParams()
        return tv
    }

    @NonNull
    private fun getLayoutParams(): LayoutParams {
        val params = LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT)
        params.setMargins(2, 0, 0, 2)
        return params
    }

    private fun getTblLayoutParams(): TableLayout.LayoutParams {
        return TableLayout.LayoutParams(
                LayoutParams.MATCH_PARENT,
                LayoutParams.WRAP_CONTENT)
    }

    private fun addHeaders() {
        val tl: TableLayout = table
        val tr = TableRow(this.context)
        tr.layoutParams = getLayoutParams()
        tr.addView(getTextView(0, Constants.ROLL, Color.WHITE, Typeface.BOLD, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary)))
        tr.addView(getTextView(0, Constants.NAME, Color.WHITE, Typeface.BOLD, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary)))
        tr.addView(getTextView(0, Constants.QUESTION_ATTEMPT, Color.WHITE, Typeface.BOLD, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary)))
        tr.addView(getTextView(0, Constants.CORRECT_ATTEMPT, Color.WHITE, Typeface.BOLD, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary)))
        tr.addView(getTextView(0, Constants.TOTAL_MARKS, Color.WHITE, Typeface.BOLD, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary)))
        tl.addView(tr, getTblLayoutParams())
    }

    private fun addData(result: List<CollegeWiseResultResponse>) {
        val numResults: Int = result.size
        val tl: TableLayout = table
        for (i in 0 until numResults) {
            val tr = TableRow(this.context)
            tr.layoutParams = getLayoutParams()
            tr.addView(this.context?.let { ContextCompat.getColor(it, R.color.colorAccent) }?.let { getTextView(i + 1, result[i].studentRollNo, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary), Typeface.NORMAL, it) })
            tr.addView(this.context?.let { ContextCompat.getColor(it, R.color.colorAccent) }?.let { result[i].studentName?.let { it1 -> getTextView(i + numResults, it1, ContextCompat.getColor(this.requireContext(), R.color.colorPrimary), Typeface.NORMAL, it) } })
            tr.addView(this.context?.let { ContextCompat.getColor(it, R.color.colorAccent) }?.let { getTextView(i + 1, result[i].questionAttended.toString(), ContextCompat.getColor(this.requireContext(), R.color.colorPrimary), Typeface.NORMAL, it) })
            tr.addView(this.context?.let { ContextCompat.getColor(it, R.color.colorAccent) }?.let { getTextView(i + 1, result[i].correctAttempted.toString(), ContextCompat.getColor(this.requireContext(), R.color.colorPrimary), Typeface.NORMAL, it) })
            tr.addView(this.context?.let { ContextCompat.getColor(it, R.color.colorAccent) }?.let { getTextView(i + 1, result[i].totalMarksScored.toString(), ContextCompat.getColor(this.requireContext(), R.color.colorPrimary), Typeface.NORMAL, it) })
            tl.addView(tr, getTblLayoutParams())
        }
    }

    override fun showResultList(result: List<CollegeWiseResultResponse>) {
        addHeaders()
        addData(result)
    }

}