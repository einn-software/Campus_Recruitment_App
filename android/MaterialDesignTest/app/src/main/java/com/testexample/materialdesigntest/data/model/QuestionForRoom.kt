package com.testexample.materialdesigntest.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import org.jetbrains.annotations.NotNull

@Entity(tableName = "questions_table")
data class QuestionForRoom(
    @SerializedName("_id")@PrimaryKey @NotNull val questionId: String,
    @SerializedName("question")val questionText: String,
    @SerializedName("topic")val topic: String,
    @SerializedName("options")val options: List<String>,
    @SerializedName("weight")val weight: Int
)

