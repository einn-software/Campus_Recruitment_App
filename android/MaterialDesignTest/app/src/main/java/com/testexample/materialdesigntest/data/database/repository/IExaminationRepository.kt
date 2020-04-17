package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.Section

interface IExaminationRepository {
    fun fetchQuestion(id:String):Question
    fun fetchSection(name:String):Section

}