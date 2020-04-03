package com.testexample.materialdesigntest.data.room

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.testexample.materialdesigntest.data.database.Student

@Database(entities = [(Student::class)], version = 1, exportSchema = false)
abstract class StudentDatabase: RoomDatabase() {
    abstract fun studentDAO(): StudentDao

    companion object{

        //value is never cached and read/writes are done from main memory
        //value is up to date and is same for all execution threads
        @Volatile
        private var INSTANCE: StudentDatabase? = null

        fun getInstance(context: Context):StudentDatabase {
            synchronized(this) {
                var instance = INSTANCE

                if (instance == null) {
                        instance = Room.databaseBuilder(
                            context.applicationContext,
                            StudentDatabase::class.java,
                            "user_database"
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