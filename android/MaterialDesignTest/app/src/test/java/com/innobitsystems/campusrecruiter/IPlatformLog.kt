package com.innobitsystems.campusrecruiter

interface IPlatformLog {
    fun e(tag: String, msg: String, throwable: Throwable?=null)
    fun i(tag: String, msg: String)
}