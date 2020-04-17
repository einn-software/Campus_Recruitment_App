package com.testexample.materialdesigntest.data.model

data class QuestionPaper(
    var questionPaperId:Long,
    var maxMarks:Int,
    var maxTime:Int,
    var collegeId:String,
    val section: Section,
    val question: Question
)