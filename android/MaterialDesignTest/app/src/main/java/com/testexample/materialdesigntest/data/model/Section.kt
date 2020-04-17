package com.testexample.materialdesigntest.data.model

data class Section(
    val sectionName:String,
    val marks:Int,
    val noOfQuestion:Int,
    val questionIdList:List<String>
)