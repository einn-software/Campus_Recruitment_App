package com.testexample.materialdesigntest.data.database.room

import androidx.annotation.VisibleForTesting
import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import io.reactivex.Flowable
import io.reactivex.Maybe
import java.sql.Date

@Dao
@VisibleForTesting
interface QuestionPaperDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(questionPaper: QuestionPaper)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestions(questions: List<Question>)

    @Delete
    fun deleteQuestionPaper(questionPaper: QuestionPaper)

    @Query("SELECT * FROM question_paper_table WHERE college_code = :collegeCode AND date = :examDate")
    fun getQuestionPaper(collegeCode: Long, examDate: Date): Flowable<QuestionPaper>
}