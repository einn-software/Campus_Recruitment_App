package com.testexample.materialdesigntest.ui.tpoDashboard

import android.annotation.SuppressLint
import android.app.Activity
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.testexample.materialdesigntest.R


class QuestionPaperAdapter(private val context: Activity, private val questionPaperName: ArrayList<String>, private val questionPaperId: ArrayList<String>, private val questionPaperDate: ArrayList<String>)
    : ArrayAdapter<String>(context, R.layout.custom_list, questionPaperName){

    @SuppressLint("ViewHolder", "InflateParams")
    override fun getView(position: Int, view: View?, parent: ViewGroup): View {
        val inflater = context.layoutInflater
        val rowView = inflater.inflate(R.layout.custom_list, null, true)

        val titleText = rowView.findViewById(R.id.questionPaperNameText) as TextView
        val subtitleText = rowView.findViewById(R.id.questionPaperDateText) as TextView
        val idText = rowView.findViewById(R.id.questionPaperIdText) as TextView


        titleText.text = questionPaperName[position]
        subtitleText.text = questionPaperDate[position]
        idText.text = questionPaperId[position]
        idText.visibility = View.INVISIBLE

        return rowView
    }

}