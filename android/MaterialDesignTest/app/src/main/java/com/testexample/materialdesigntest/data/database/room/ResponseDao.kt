package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.QuestionForRoom
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.Response
import com.testexample.materialdesigntest.data.model.Result
import io.reactivex.Completable
import io.reactivex.Flowable
import io.reactivex.Single

@Dao
interface ResponseDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertResponse(response: Response): Completable

    @Delete
    fun deleteResponse(response: Response): Completable

    @Query("SELECT SUM(marksRewarded) FROM student_response_table WHERE isResponseCorrect = 1")
    fun getStudentScore(): Int
}