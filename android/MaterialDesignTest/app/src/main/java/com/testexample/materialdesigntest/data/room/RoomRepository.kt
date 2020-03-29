package com.testexample.materialdesigntest.data.room

import com.testexample.materialdesigntest.data.database.User
import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.services.ProjectApplication

class RoomRepository : IUserRepository {

    private val userDAO: UserDAO = ProjectApplication.database.userDAO()

    override fun isUserValid(userEmail: String,
                             password: String):
            Boolean {
        return userEmail == userDAO
            .getUserByEmailPassword(userEmail, password)
            .uEmail
    }

    override fun isExistingUser(userEmail: String): Boolean {
        return userEmail == userDAO
            .getUserByEmail(userEmail)
    }

    override fun getUser(userEmail: String,
                         password: String):
            User {
        return  userDAO
            .getUserByEmailPassword(userEmail, password)
    }
}






