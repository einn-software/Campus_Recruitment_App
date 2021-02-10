package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.AnswerResponse
import io.reactivex.Completable
import io.reactivex.Single


@Dao
interface ExaminationDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAnswer(answerResponse: AnswerResponse): Completable

    @Delete
    fun deleteAnswers(answerResponse: List<AnswerResponse>): Completable

    @Update
    fun updateAnswer(answerResponse: AnswerResponse): Completable

    @Query("SELECT * FROM answer_table")
    fun getAnswers(): Single<List<AnswerResponse>>

    @Query("SELECT * FROM answer_table WHERE questionId = :id")
    fun getAnswerById(id: String): Single<AnswerResponse>
}