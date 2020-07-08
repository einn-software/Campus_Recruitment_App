package com.testexample.materialdesigntest.root

import android.app.Application
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase

class CRApplication : Application() {

    companion object {
        var database : ApplicationDatabase? = null
    }

//    override fun onCreate() {
//        super.onCreate()
//        database =
//
//    }
}