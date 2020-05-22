package com.testexample.materialdesigntest.data.network.model

import com.google.gson.annotations.SerializedName

data class InstructionRequest(
    @SerializedName("id")val code: String
)