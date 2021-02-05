package com.testexample.materialdesigntest.ui

import android.app.Activity
import androidx.appcompat.app.AlertDialog
import com.testexample.materialdesigntest.R
import kotlinx.android.synthetic.main.custom_progress.*

class ProgressBar(private val activity: Activity) {

    private  val progressBox = AlertDialog.Builder(activity).apply {
        setView(R.layout.custom_progress)
        setCancelable(true)
    }.create()


    fun startLoading(){

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