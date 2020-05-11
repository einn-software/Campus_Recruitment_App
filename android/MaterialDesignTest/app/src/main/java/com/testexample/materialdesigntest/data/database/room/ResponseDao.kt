package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Flowable

@Dao
interface ResponseDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(response: Response)

    @Delete
    fun deleteQuestionPaper(response: Response)

    @Query("SELECT SUM(marksRewarded) FROM student_response_table WHERE isResponseCorrect = 1")
    fun getStudentScore(): Int
}