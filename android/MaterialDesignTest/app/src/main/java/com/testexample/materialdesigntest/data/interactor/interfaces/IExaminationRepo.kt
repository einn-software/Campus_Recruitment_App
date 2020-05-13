package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import io.reactivex.Flowable
import io.reactivex.Single

interface IExaminationRepo {
    fun loadQuestionPaperFromRoom(collegeCode: String, date: String): Single<QuestionPaperComplete>?
    fun fetchQuestionFromRemote(questionId: String): Single<Question>
    fun fetchQuestionFromRoom(questionId: String): Single<Question>
    fun addQuestion(questions: List<Question>)
    fun addQuestionPaper(questionPaper: QuestionPaperComplete)
    fun loadQuestionPaperFromRemote(collegeCode: String, date: String): Single<QuestionPaperComplete>
}