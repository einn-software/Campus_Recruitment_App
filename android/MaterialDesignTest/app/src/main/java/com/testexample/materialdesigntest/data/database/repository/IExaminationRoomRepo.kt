package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Section
import io.reactivex.Single
import java.sql.Date

interface IExaminationRoomRepo {
    fun fetchQuestion(id:String): Single<Question>
    fun fetchQuestionPaper(code: String, date: Date): Single<QuestionPaper>
    fun addQuestionPaper(questionPaper: QuestionPaper)
    fun addQuestion(question: Question)

}