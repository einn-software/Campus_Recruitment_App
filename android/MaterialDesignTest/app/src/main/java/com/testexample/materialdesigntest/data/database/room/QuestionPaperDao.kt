package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.*
import io.reactivex.Single


@Dao
abstract class QuestionPaperDao {

    fun insertSectionsForQuestionPaper(questionPaper: QuestionPaperForRoom, sections: List<SectionForRoom>){
        for (section in sections) {
            section.id = questionPaper.questionPaperId
        }
        insertSections(sections)
    }

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertSections(sections: List<SectionForRoom>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertQuestionPaper(questionPaper: QuestionPaperForRoom)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertQuestionForRooms(questions: List<QuestionForRoom>)

    @Delete
    abstract fun deleteQuestionPaper(questionPaper: QuestionPaperForRoom)

    @Transaction
    @Query("SELECT * FROM QuestionPaperForRoom WHERE collegeCode = :collegeCode AND date = :examDate")
    abstract fun getQuestionPaper(collegeCode: String, examDate: String): Single<QuestionPaperCompleteForRoom>

    @Query("SELECT * FROM questions_table WHERE questionId = :questionId")
    abstract fun getQuestion(questionId: String): Single<QuestionForRoom>


}