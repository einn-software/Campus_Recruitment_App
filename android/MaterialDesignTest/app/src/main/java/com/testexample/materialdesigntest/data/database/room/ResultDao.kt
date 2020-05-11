package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Flowable

@Dao
interface ResultDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertQuestionPaper(result: Result)

    @Delete
    fun deleteQuestionPaper(result: Result)

    @Query("SELECT * FROM student_result_table WHERE studentId = :rollNo")
    fun getStudentResult(rollNo: Long): Flowable<Result>
}