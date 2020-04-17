package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.database.room.ExaminationDao
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.Section

class ExaminationRepository(private val examinationDao: ExaminationDao):IExaminationRepository {
    override fun fetchQuestion(id: String): Question {
        TODO("Not yet implemented")
    }

    override fun fetchSection(name: String): Section {
        TODO("Not yet implemented")
    }
}