package com.testexample.materialdesigntest.data.model

import androidx.room.TypeConverter

class Converter {
    @TypeConverter
    fun listToString(value: List<String>):String {
        return value.joinToString(separator = ",")
    }

    @TypeConverter
    fun stringToList(value: String): List<String> {
        return value.split(",").map { it }
    }
}
