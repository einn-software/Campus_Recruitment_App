package com.testexample.materialdesigntest.data.database.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "college_table")
data class College(@NonNull @PrimaryKey(autoGenerate = true)
                   @ColumnInfo(name = "student_Id") val studentId: Long = 0) {
}