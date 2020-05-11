package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.database.room.QuestionPaperDao
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Section
import io.reactivex.Single
import java.sql.Date

class ExaminationRoomRepo(private val questionPaperDao: QuestionPaperDao):IExaminationRoomRepo {
    override fun fetchQuestion(id: String): Single<Question> {
        TODO("Not yet implemented")
    }

    override fun fetchQuestionPaper(code: String, date: Date): Single<QuestionPaper> {
        TODO("Not yet implemented")
    }

    override fun addQuestionPaper(questionPaper: QuestionPaper) {
        TODO("Not yet implemented")
    }

    override fun addQuestion(question: Question) {
        TODO("Not yet implemented")
    }


}