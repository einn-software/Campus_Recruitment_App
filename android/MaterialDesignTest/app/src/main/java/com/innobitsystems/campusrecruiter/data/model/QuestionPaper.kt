package com.innobitsystems.campusrecruiter.data.model

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Parcelize
data class QuestionPaper(
    @SerializedName("_id") val questionPaperId:String,
    @SerializedName("paper_name") val questionPaperName:String,
    @SerializedName("paper_max_marks") val maxMarks:Int,
    @SerializedName("max_time") val maxTime:Int,
    @SerializedName("instructions_id") val instructionId: String,
    @SerializedName("code") val collegeCode: Int,
    @SerializedName("day") val date: Int,
    @SerializedName("month") val month: Int,
    @SerializedName("year") val year: Int,
    @SerializedName("start_time") val startTime: String  ,
    @SerializedName("enabled") val enabled: Boolean,
    @SerializedName("trigger_type") val trigger: Int,
    @SerializedName("negative_marking_ratio") val negativeMarkingRatio: Double,
    @SerializedName("sections") val sections: List<Section>
) : Parcelable

@Parcelize
data class Section(
    @SerializedName("_id")val sectionId: String?,
    @SerializedName("section_name")val sectionName: String,
    @SerializedName("marks")val marks: Int,
    @SerializedName("num_of_questions")val noOfQuestion: Int,
    @SerializedName("question_list") val questionsList: List<QuestionsList>
) : Parcelable

@Parcelize
data class QuestionsList(
        @SerializedName("question_id")val questionId: String,
        @SerializedName("question_marks")val marks: Int
) : Parcelable
