package com.testexample.materialdesigntest.data.model

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import java.lang.reflect.Type
import java.util.*


open class Converter {
    @TypeConverter
    open fun listToString(value: List<String>):String {
        return value.joinToString(separator = ",")
    }

    @TypeConverter
    open fun stringToList(value: String): List<String> {
        return value.split(",").map { it }
    }

//    @TypeConverter
//    open fun dateToString(value: Date):String {
//        return value.toString()
//    }
//
//    @TypeConverter
//    open fun stringToDate(value: String): List<String> {
//        return value.
//    }

//    @TypeConverter
//    open fun stringFromObject(list: List<Section?>?): String? {
//        val gson = Gson()
//        return gson.toJson(list)
//    }
//
//    @TypeConverter
//    open fun getObjectFromString(jsonString: String?): List<Section?>? {
//        val listType: Type = object : TypeToken<List<Section?>?>() {}.type
//        return Gson().fromJson(jsonString, listType)
//    }
}
