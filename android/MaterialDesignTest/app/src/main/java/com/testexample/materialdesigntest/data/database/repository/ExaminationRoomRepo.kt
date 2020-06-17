package com.testexample.materialdesigntest.data.database.repository

import android.content.Context
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase
import com.testexample.materialdesigntest.data.database.room.QuestionPaperDao
import com.testexample.materialdesigntest.data.database.room.ResponseDao
import com.testexample.materialdesigntest.data.model.QuestionForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaperCompleteForRoom
import com.testexample.materialdesigntest.data.model.Response
import io.reactivex.Completable
import io.reactivex.Single


class ExaminationRoomRepo(context: Context):IExaminationRoomRepo {

    private val questionPaperDao: QuestionPaperDao =
        ApplicationDatabase
            .getInstance(context)
            .questionPaperDAO()

    private val responseDao: ResponseDao =
        ApplicationDatabase.getInstance(context).responseDAO()

    override fun fetchQuestionForRoom(id: String): Single<QuestionForRoom> {
        return questionPaperDao.getQuestion(id)
    }

    override fun fetchQuestionPaper(code: String, date: String): Single<QuestionPaperCompleteForRoom>? {
        return questionPaperDao.getQuestionPaper(code, date)
    }


    override fun addQuestionPaper(questionPaper: QuestionPaperCompleteForRoom) {
        questionPaperDao.insertQuestionPaper(questionPaper.questionPaper)
        questionPaperDao.insertSections(questionPaper.sections)
    }

    override fun addQuestionForRoom(questions: List<QuestionForRoom>) {
        questionPaperDao.insertQuestionForRooms(questions)
    }

    override fun addResponse(response: Response): Completable {
        return  responseDao.insertResponse(response)
    }

    override fun fetchScores(): Int {
        TODO("Not yet implemented")
    }


}