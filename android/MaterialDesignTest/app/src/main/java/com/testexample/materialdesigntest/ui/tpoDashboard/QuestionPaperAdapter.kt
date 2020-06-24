package com.testexample.materialdesigntest.ui.TPODashboard

import android.annotation.SuppressLint
import android.app.Activity
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.testexample.materialdesigntest.R


class QuestionPaperAdapter(private val context: Activity, private val questionPaperName: ArrayList<String>, private val questionPaperId: ArrayList<String>)
    : ArrayAdapter<String>(context, R.layout.custom_list, questionPaperName){

    @SuppressLint("ViewHolder", "InflateParams")
    override fun getView(position: Int, view: View?, parent: ViewGroup): View {
        val inflater = context.layoutInflater
        val rowView = inflater.inflate(R.layout.custom_list, null, true)

        val titleText = rowView.findViewById(R.id.title) as TextView
        val subtitleText = rowView.findViewById(R.id.description) as TextView

        titleText.text = questionPaperName[position]
        subtitleText.text = questionPaperId[position]

        return rowView
    }

}