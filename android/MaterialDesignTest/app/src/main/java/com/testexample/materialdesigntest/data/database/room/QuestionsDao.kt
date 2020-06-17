package com.testexample.materialdesigntest.data.database.room

import androidx.annotation.VisibleForTesting
import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaper
import io.reactivex.Flowable
import io.reactivex.Maybe
import java.sql.Date

@Dao
@VisibleForTesting
interface QuestionsDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(question: Question)

    @Delete
    fun deleteQuestionPaper(question: Question)

    @Query("SELECT * FROM questions_table WHERE questionId = :questionId")
    fun getQuestion(questionId: String): Flowable<QuestionForRoom>
}