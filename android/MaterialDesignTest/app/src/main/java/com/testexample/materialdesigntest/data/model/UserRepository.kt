package com.testexample.materialdesigntest.data.model

import com.testexample.materialdesigntest.data.room.RoomRepository
import com.testexample.materialdesigntest.data.database.User
import com.testexample.materialdesigntest.data.interactor.IUserRepository

// makes a singleton, has a single instance running at a time
class UserRepository: IUserRepository {

    private val roomRepository = RoomRepository()
    override fun isUserValid(userEmail: String,
                             password: String):
            Boolean {
        return roomRepository.isUserValid(userEmail, password)
    }

    override fun isExistingUser(userEmail: String): Boolean {
        return roomRepository.isExistingUser(userEmail)
    }

    override fun getUser(userEmail: String,
                         password: String):
            User {
        return roomRepository.getUser(userEmail, password)
    }


}