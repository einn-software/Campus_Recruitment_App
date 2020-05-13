package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import io.reactivex.Single


@Dao
interface QuestionPaperDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(questionPaper: QuestionPaperComplete)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestions(questions: List<Question>)

    @Delete
    fun deleteQuestionPaper(questionPaper: QuestionPaper)

    @Transaction
    @Query("SELECT * FROM question_paper_table WHERE college_code = :collegeCode AND date = :examDate")
    fun getQuestionPaper(collegeCode: String, examDate: String): Single<QuestionPaperComplete>

    @Query("SELECT * FROM questions_table WHERE questionId = :questionId")
    fun getQuestion(questionId: String): Single<Question>


}