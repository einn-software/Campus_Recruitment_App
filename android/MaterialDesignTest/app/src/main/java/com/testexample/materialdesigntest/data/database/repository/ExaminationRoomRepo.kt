package com.testexample.materialdesigntest.data.database.repository

import android.content.Context
import com.testexample.materialdesigntest.data.database.room.ApplicationDatabase
import com.testexample.materialdesigntest.data.database.room.ExaminationDao
import com.testexample.materialdesigntest.data.model.AnswerResponse
import io.reactivex.Completable
import io.reactivex.Single

class ExaminationRoomRepo(context: Context) :
    IExaminationRoomRepo {

    private val examinationDao: ExaminationDao =
        ApplicationDatabase.getInstance(context).examinationDAO()

    override fun saveAnswerResponse(answerResponse: AnswerResponse): Completable {
        return examinationDao.insertAnswer(answerResponse)
    }

    override fun updateAnswerResponse(answerResponse: AnswerResponse): Completable {
        return examinationDao.updateAnswer(answerResponse)
    }

    override fun deleteAnswerResponse(answerResponseList: List<AnswerResponse>): Completable {
        return examinationDao.deleteAnswers(answerResponseList)
    }

    override fun getAnswerResponse():Single<List<AnswerResponse>> {
        return examinationDao.getAnswers()
    }

    override fun getAnswerResponseById(questionId: String): Single<AnswerResponse> {
        return examinationDao.getAnswerById(questionId)
    }


}







