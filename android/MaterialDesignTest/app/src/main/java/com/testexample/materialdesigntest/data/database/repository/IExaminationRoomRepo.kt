package com.testexample.materialdesigntest.data.database.repository

import com.testexample.materialdesigntest.data.model.QuestionForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaperCompleteForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaperForRoom
import com.testexample.materialdesigntest.data.model.Response
import io.reactivex.Completable
import io.reactivex.Single

interface IExaminationRoomRepo {
    fun fetchQuestionForRoom(id:String): Single<QuestionForRoom>
    fun fetchQuestionPaper(code: String, date: String): Single<QuestionPaperCompleteForRoom>?
    fun addQuestionPaper(questionPaper: QuestionPaperCompleteForRoom)
    fun addQuestionForRoom(QuestionForRooms: List<QuestionForRoom>)
    fun addResponse(response: Response): Completable
    fun fetchScores():Int

}