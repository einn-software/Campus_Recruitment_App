package com.testexample.materialdesigntest.data.model

data class Question(
    val questionId: String,
    val questionText:String,
    val topic:String,
    val option:List<String>,
    val answer:String,
    val weight:Int
)