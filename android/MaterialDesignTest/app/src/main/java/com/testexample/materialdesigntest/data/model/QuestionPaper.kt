package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.*


@Entity
data class QuestionPaper(
    @NonNull @PrimaryKey
    @ColumnInfo(name = "question_paper_Id") val questionPaperId:String,
    @ColumnInfo(name = "max_marks") val maxMarks:Int,
    @ColumnInfo(name = "max_time") val maxTime:Int,
    @ColumnInfo(name = "college_code") val collegeCode: String,
    @ColumnInfo(name = "date") val date: String
)

@Entity
data class Section(
    var id: String,
    @PrimaryKey val sectionName: String,
    val marks: Int,
    val noOfQuestion: Int,
    val questionIdList: List<String>
)

@Entity
data class QuestionPaperComplete(
    @Embedded val questionPaper: QuestionPaper,
    @Relation(parentColumn = "question_paper_Id", entityColumn = "id" )
    val sections: List<Section>
)