package com.innobitsystems.campusrecruiter.data.interactor.interfaces

import com.innobitsystems.campusrecruiter.data.model.College
import com.innobitsystems.campusrecruiter.data.network.model.UpdateCollegeDetails
import io.reactivex.Single

interface ICollegeDetails {
    fun getCollegeDetails(token: String, code: Int): Single<College>
    fun updateCollegeDetails(token: String, code: Int, updateCollegeDetails: UpdateCollegeDetails): Single<College>
}