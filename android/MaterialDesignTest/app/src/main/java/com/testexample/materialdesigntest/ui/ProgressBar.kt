package com.testexample.materialdesigntest.ui

import android.app.Activity
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.custom_progress.*

class ProgressBar(private val activity: Activity) {

    private lateinit var progressBox: AlertDialog

    private val builder = AlertDialog.Builder(activity).apply {
        setView(activity.layoutInflater.inflate(R.layout.custom_progress,null, false))
        setCancelable(true)
    }

    fun startLoading(){
        progressBox = builder.create()
        progressBox.show()
    }

    fun stopLoading(){
        progressBox.dismiss()
    }

    fun setLoadingText(message: String){
        activity.setContentView(R.layout.custom_progress)
        activity.loadingText.text = message
    }


}