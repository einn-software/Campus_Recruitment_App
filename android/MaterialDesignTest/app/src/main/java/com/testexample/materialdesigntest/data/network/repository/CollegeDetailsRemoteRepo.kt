package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single


class CollegeDetailsRemoteRepo: ICollegeDetailsRemoteRepo {
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForGetCollegeDetails(token: String, code: Int): Single<College> {
        return api.getCollege(token, code)
    }

    override fun callApiForUpdateCollegeDetails(token: String, name: String, address: String, university: String, email: String, phone: String): Single<College> {
        return api.updateCollege(token, name, address, university, email, phone)
    }


}