package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import java.util.*


interface IExaminationRepo {
    fun loadQuestionPaper(collegeCode: String, date: Date)
    fun fetchQuestionFromRemote(questionId: String)
    fun fetchQuestionFromRoom(questionId: String)
    fun addQuestion(question: Question)
    fun addQuestionPaper(questionPaper: QuestionPaper)
}