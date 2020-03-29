package com.testexample.materialdesigntest.services

import android.app.Application
import androidx.room.Room.databaseBuilder
import com.testexample.materialdesigntest.data.room.UserDatabase

class ProjectApplication: Application() {

    companion object {
        lateinit var database: UserDatabase
    }

    override fun onCreate() {
        super.onCreate()

        database = databaseBuilder(this,
            UserDatabase::class.java,
            "user_database").build()

    }
}