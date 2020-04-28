package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.sql.Date

@Entity(tableName = "question_paper_table")
data class QuestionPaper(
    @NonNull @PrimaryKey
    @ColumnInfo(name = "question_paper_Id") val questionPaperId:Long,
    @ColumnInfo(name = "max_marks") val maxMarks:Int,
    @ColumnInfo(name = "max_time") val maxTime:Int,
    @ColumnInfo(name = "college_Id") val collegeId:String,
    @ColumnInfo(name = "date") val date: Date,
    @ColumnInfo(name = "section") val section: Section,
    @ColumnInfo(name = "question_list") val questionList: List<Question>? = null
)