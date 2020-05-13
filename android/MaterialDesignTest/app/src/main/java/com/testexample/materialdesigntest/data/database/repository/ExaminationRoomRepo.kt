package com.testexample.materialdesigntest.data.database.repository

import android.content.Context
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase
import com.testexample.materialdesigntest.data.database.room.QuestionPaperDao
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import io.reactivex.Single


class ExaminationRoomRepo(context: Context):IExaminationRoomRepo {

    private val questionPaperDao: QuestionPaperDao =
        ApplicationDatabase
            .getInstance(context)
            .questionPaperDAO()

    override fun fetchQuestion(id: String): Single<Question> {
        return questionPaperDao.getQuestion(id)
    }

    override fun fetchQuestionPaper(code: String, date: String): Single<QuestionPaperComplete> {
        return questionPaperDao.getQuestionPaper(code, date)
    }

    override fun addQuestionPaper(questionPaper: QuestionPaperComplete) {
        questionPaperDao.insertQuestionPaper(questionPaper)
    }

    override fun addQuestion(questions: List<Question>) {
        questionPaperDao.insertQuestions(questions)
    }


}