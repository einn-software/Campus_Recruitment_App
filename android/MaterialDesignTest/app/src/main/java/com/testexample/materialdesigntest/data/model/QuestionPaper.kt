package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.ColumnInfo
import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.sql.Date

@Entity(tableName = "question_paper_table")
data class QuestionPaper(
    @NonNull @PrimaryKey
    @ColumnInfo(name = "question_paper_Id") val questionPaperId:Long,
    @ColumnInfo(name = "max_marks") val maxMarks:Int,
    @ColumnInfo(name = "max_time") val maxTime:Int,
    @ColumnInfo(name = "college_code") val collegeCode: Long,
    @ColumnInfo(name = "date") val date: Date,
    @Embedded @ColumnInfo(name = "section") val section: Section
)


data class Section(
    val sectionName: String,
    val marks: Int,
    val noOfQuestion: Int,
    val questionIdList: List<String>
)