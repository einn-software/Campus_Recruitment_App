package com.testexample.materialdesigntest.data.database.room

import androidx.room.*
import com.testexample.materialdesigntest.data.model.Question
import com.testexample.materialdesigntest.data.model.QuestionPaper
import com.testexample.materialdesigntest.data.model.QuestionPaperComplete
import com.testexample.materialdesigntest.data.model.Section
import io.reactivex.Single


@Dao
abstract class QuestionPaperDao {

    fun insertSectionsForQuestionPaper(questionPaper: QuestionPaper, sections: List<Section>){
        for (section in sections) {
            section.id = questionPaper.questionPaperId
        }
        insertSections(sections)
    }

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertSections(sections: List<Section>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertQuestionPaper(questionPaper: QuestionPaper)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    abstract fun insertQuestions(questions: List<Question>)

    @Delete
    abstract fun deleteQuestionPaper(questionPaper: QuestionPaper)

    @Transaction
    @Query("SELECT * FROM QuestionPaper WHERE collegeCode = :collegeCode AND date = :examDate")
    abstract fun getQuestionPaper(collegeCode: String, examDate: String): Single<QuestionPaperComplete>

    @Query("SELECT * FROM questions_table WHERE questionId = :questionId")
    abstract fun getQuestion(questionId: String): Single<Question>


}