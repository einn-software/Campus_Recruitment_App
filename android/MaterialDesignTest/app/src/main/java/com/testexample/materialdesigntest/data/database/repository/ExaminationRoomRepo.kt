package com.testexample.materialdesigntest.data.database.repository

import android.content.Context
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase
import com.testexample.materialdesigntest.data.database.room.QuestionPaperDao
import com.testexample.materialdesigntest.data.database.room.ResponseDao
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import com.testexample.materialdesigntest.data.model.Response
import io.reactivex.Completable
import io.reactivex.Scheduler
import io.reactivex.Single
import io.reactivex.schedulers.Schedulers


class ExaminationRoomRepo(context: Context):IExaminationRoomRepo {

    private val questionPaperDao: QuestionPaperDao =
        ApplicationDatabase
            .getInstance(context)
            .questionPaperDAO()

    private val responseDao: ResponseDao =
        ApplicationDatabase.getInstance(context).responseDAO()

    override fun fetchQuestion(id: String): Single<Question> {
        return questionPaperDao.getQuestion(id)
    }

    override fun fetchQuestionPaper(code: String, date: String): Single<QuestionPaperComplete> {
        return questionPaperDao.getQuestionPaper(code, date)
    }

    override fun addQuestionPaper(questionPaper: QuestionPaperComplete) {
        questionPaperDao.insertQuestionPaper(questionPaper.questionPaper)
        questionPaperDao.insertSections(questionPaper.sections)
    }

    override fun addQuestion(questions: List<Question>) {
        questionPaperDao.insertQuestions(questions)
    }

    override fun addResponse(response: Response): Completable {
        return  responseDao.insertResponse(response)
    }

    override fun fetchScores(): Int {
        TODO("Not yet implemented")
    }


}