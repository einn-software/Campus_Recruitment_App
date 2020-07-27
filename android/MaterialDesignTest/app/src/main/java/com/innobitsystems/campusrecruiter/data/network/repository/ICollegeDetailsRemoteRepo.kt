package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.data.model.College
import com.innobitsystems.campusrecruiter.data.network.model.UpdateCollegeDetails
import io.reactivex.Single

interface ICollegeDetailsRemoteRepo {
    fun callApiForGetCollegeDetails(token: String, code: Int): Single<College>
    fun callApiForUpdateCollegeDetails(token: String, code: Int, updateCollegeDetails: UpdateCollegeDetails): Single<College>
}