package com.testexample.materialdesigntest.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "questions_table")
data class Question(
    @PrimaryKey val questionId: String,
    val questionText:String,
    val topic:String,
    val option:List<String>,
    val answer:String,
    val weight:Int
)