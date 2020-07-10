package com.testexample.materialdesigntest.data.model

import androidx.room.TypeConverter


open class Converter {
    @TypeConverter
    open fun listToString(value: List<String>):String {
        return value.joinToString(separator = ",")
    }

    @TypeConverter
    open fun stringToList(value: String): List<String> {
        return value.split(",").map { it }
    }

}
