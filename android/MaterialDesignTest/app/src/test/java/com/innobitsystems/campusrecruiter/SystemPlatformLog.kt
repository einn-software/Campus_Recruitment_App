package com.innobitsystems.campusrecruiter

class SystemPlatformLog : IPlatformLog{
    override fun i(tag: String, msg: String) {
        println("$tag : $msg")
    }

    override fun e(tag: String, msg: String, throwable: Throwable?) {
        println("$tag : $msg")
    }
}