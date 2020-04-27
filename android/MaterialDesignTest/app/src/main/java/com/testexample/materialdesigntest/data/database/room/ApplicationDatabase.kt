package com.testexample.materialdesigntest.data.database.room

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.model.College

@Database(entities = [Student::class, College::class], version = 1, exportSchema = false)
abstract class ApplicationDatabase: RoomDatabase() {
    abstract fun studentDAO(): StudentDao
    abstract fun collegeDAO(): CollegeDao

    companion object{

        //value is never cached and read/writes are done from main memory
        //value is up to date and is same for all execution threads
        @Volatile
        private var INSTANCE: ApplicationDatabase? = null

        fun getInstance(context: Context):ApplicationDatabase {
            synchronized(this) {
                var instance = INSTANCE

                if (instance == null) {
                        instance = Room.databaseBuilder(
                            context.applicationContext,
                            ApplicationDatabase::class.java,
                            "application_database"
                        )
                            .fallbackToDestructiveMigration()   //later we'll add migration here
                            .build()
                        INSTANCE = instance
                    }
                return instance
            }
        }
    }
}