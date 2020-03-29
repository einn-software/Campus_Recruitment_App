package com.testexample.materialdesigntest.data.interactor

import com.testexample.materialdesigntest.data.database.User

interface IUserRepository {

    fun isUserValid(
        userEmail: String,
        password: String
    ): Boolean

    fun isExistingUser(
        userEmail: String
    ): Boolean

    fun getUser(
        userEmail: String,
        password: String
    ): User
}



