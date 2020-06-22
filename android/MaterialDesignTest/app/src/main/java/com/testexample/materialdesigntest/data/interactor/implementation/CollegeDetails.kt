package com.testexample.materialdesigntest.data.interactor.implementation

import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.repository.CollegeDetailsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.ICollegeDetailsRemoteRepo
import io.reactivex.Single

class CollegeDetails: ICollegeDetails {
    private val remoteRepo: ICollegeDetailsRemoteRepo = CollegeDetailsRemoteRepo()
    override fun getCollegeDetails(token: String, code: Int): Single<College> {
        return remoteRepo.callApiForGetCollegeDetails(token, code)
    }

    override fun updateCollegeDetails(token: String, name: String, address: String, university: String, email: String, phone: String): Single<College> {
        return remoteRepo.callApiForUpdateCollegeDetails(token, name, address, university, email, phone)
    }
}