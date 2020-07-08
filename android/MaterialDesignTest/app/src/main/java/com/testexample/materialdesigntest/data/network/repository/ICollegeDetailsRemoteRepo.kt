package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import io.reactivex.Single

interface ICollegeDetailsRemoteRepo {
    fun callApiForGetCollegeDetails(token: String, code: Int): Single<College>
    fun callApiForUpdateCollegeDetails(token: String, code: Int, updateCollegeDetails: UpdateCollegeDetails): Single<College>
}