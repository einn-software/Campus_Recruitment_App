package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import io.reactivex.Single

interface ICollegeDetails {
    fun getCollegeDetails(token: String, code: Int): Single<College>
    fun updateCollegeDetails(token: String, code: Int, collegeDetails: UpdateCollegeDetails): Single<College>
}