package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Response
import io.reactivex.Completable
import io.reactivex.Single

interface IExaminationRepo {
    fun loadQuestionPaperFromRoom(collegeCode: String, date: String): Single<QuestionPaper>?
    fun fetchQuestionFromRemote(questionId: String): Single<Question>
    fun fetchQuestionFromRoom(questionId: String): Single<Question>
    fun addQuestion(questions: List<QuestionForRoom>)
    fun addQuestionPaper(questionPaper: QuestionPaper)
    fun loadQuestionPaperFromRemote(collegeCode: String, date: String): Single<QuestionPaper>
    fun saveResponseInRoom(response: Response): Completable
    var token : String
}