package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Result

@Dao
interface ResultDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(result: Result)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestions(questions: List<Question>)

    @Delete
    fun deleteQuestionPaper(questionPaper: QuestionPaper)
}