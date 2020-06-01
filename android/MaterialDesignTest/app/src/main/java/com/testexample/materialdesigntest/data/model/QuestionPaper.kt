package com.testexample.materialdesigntest.data.model

import androidx.annotation.NonNull
import androidx.room.*
import com.google.gson.annotations.SerializedName
import java.text.SimpleDateFormat
import java.util.*


@Entity
data class QuestionPaper(
    @PrimaryKey
    @SerializedName("_id") @ColumnInfo(name = "question_paper_id") val questionPaperId:String,
    @SerializedName("paper_name") val questionPaperName:String,
    @SerializedName("max_marks") val maxMarks:Int,
    @SerializedName("max_time") val maxTime:Int,
    @SerializedName("instruction_id") val instructionId: String,
    @SerializedName("code") val collegeCode: Int,
    @SerializedName("date") val date: Int,
    @SerializedName("month") val month: Int,
    @SerializedName("year") val year: Int,
    @SerializedName("start_time") val startTime: String  ,
    @SerializedName("enabled") val enabled: Boolean,
    @SerializedName("trigger_type") val trigger: Int,
    @SerializedName("negative_marking_ratio") val negativeMarkingRatio: Double

)

@Entity
data class Section(
    @PrimaryKey
    @ColumnInfo(name = "id") var id: String,
    @SerializedName("name")val sectionName: String,
    @SerializedName("marks")val marks: Int,
    @SerializedName("num_of_questions")val noOfQuestion: Int,
    @SerializedName("question_list")val questionIdList: List<String>
)

@Entity
data class QuestionPaperComplete(
    @Embedded var questionPaper: QuestionPaper,
    @Relation(parentColumn = "question_paper_id", entityColumn = "id" )
    var sections: List<Section>
){

}