package com.testexample.materialdesigntest.data.model

import androidx.room.Entity

@Entity(tableName = "student_result_table")
data class Result(
    val studentId:String,
    val questionPaperId:String,
    val noOfQuestionsAttempted:Int,
    val noOfQuestionsCorrect: Int,
    val totalMarks:Int

)