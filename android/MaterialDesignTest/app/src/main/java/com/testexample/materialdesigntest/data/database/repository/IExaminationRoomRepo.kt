package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import io.reactivex.Single

interface IExaminationRoomRepo {
    fun fetchQuestion(id:String): Single<Question>
    fun fetchQuestionPaper(code: String, date: String): Single<QuestionPaperComplete>?
    fun addQuestionPaper(questionPaper: QuestionPaperComplete)
    fun addQuestion(questions: List<Question>)

}