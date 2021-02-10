package com.testexample.materialdesigntest.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import org.jetbrains.annotations.NotNull

@Entity(tableName = "answer_table")
data class AnswerResponse(
    @PrimaryKey @NotNull
    val questionId: String,
    val answerSheetId: String,
    val state: Int,
    val optionSelected: Int
)