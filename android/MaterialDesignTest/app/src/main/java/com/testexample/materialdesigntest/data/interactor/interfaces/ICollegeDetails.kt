package com.testexample.materialdesigntest.data.interactor.interfaces

import com.testexample.materialdesigntest.data.model.College
import io.reactivex.Single

interface ICollegeDetails {
    fun getCollegeDetails(token: String, code: Int): Single<College>
    fun updateCollegeDetails(token: String, name: String, address: String, university: String, email: String, phone: String): Single<College>
}