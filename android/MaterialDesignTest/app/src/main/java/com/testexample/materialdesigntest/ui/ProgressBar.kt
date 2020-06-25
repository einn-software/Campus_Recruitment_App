package com.testexample.materialdesigntest.ui

import android.app.Activity
import androidx.appcompat.app.AlertDialog
import com.testexample.materialdesigntest.R

class ProgressBar(private val activity: Activity) {
    private lateinit var progressBox: AlertDialog

    fun startLoading(){
        val builder = AlertDialog.Builder(activity)

        val inflater =  activity.layoutInflater
        builder.setView(inflater.inflate(R.layout.custom_progress,null))
        builder.setCancelable(false)
        progressBox = builder.create()
        progressBox.show()
    }

    fun stopLoading(){
        progressBox.dismiss()
    }


}