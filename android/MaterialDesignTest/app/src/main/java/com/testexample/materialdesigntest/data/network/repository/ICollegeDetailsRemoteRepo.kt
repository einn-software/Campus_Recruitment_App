package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import io.reactivex.Single

interface ICollegeDetailsRemoteRepo {
    fun callApiForGetCollegeDetails(token: String, code: Int): Single<College>
    fun callApiForUpdateCollegeDetails(token: String, name: String, address: String, university: String, email: String, phone: String): Single<College>
}