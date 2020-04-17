package com.testexample.materialdesigntest.data.interactor

import com.testexample.materialdesigntest.data.model.Student
import com.testexample.materialdesigntest.data.database.repository.IUserRoomRepository
import io.reactivex.Flowable

// makes a singleton, has a single instance running at a time
class UserRepository(private val roomRepository: IUserRoomRepository)
    : IUserRepository {

    override fun isUserValid(userEmail: String,
                             password: String):
            Flowable<Boolean> {
        return roomRepository
            .getUser(userEmail, password)
            .map { it-> it.studentEmail == userEmail }
    }

    override fun isExistingUser(userEmail: String):
            Boolean {
        return roomRepository.isExistingUser(userEmail)
    }

    override fun getUser(userEmail: String,
                         password: String):
            Flowable<Student> {
        return roomRepository
            .getUser(userEmail, password)
    }


}