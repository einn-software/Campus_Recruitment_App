package com.testexample.materialdesigntest.data.interactor.implementation

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.interfaces.ICollegeDetails
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.data.network.repository.CollegeDetailsRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.ICollegeDetailsRemoteRepo
import io.reactivex.Single

class CollegeDetails: ICollegeDetails {
    private val TAG = "CollegeDetails"
    private val remoteRepo: ICollegeDetailsRemoteRepo = CollegeDetailsRemoteRepo()
    override fun getCollegeDetails(token: String, code: Int): Single<College> {
        Log.d(TAG,"<< updateCollegeDetails()")
        Log.d(TAG,">> updateCollegeDetails()")
        return remoteRepo.callApiForGetCollegeDetails(token, code)
    }

    override fun updateCollegeDetails(token: String, code: Int, updatecollegeDetails: UpdateCollegeDetails): Single<College> {
        Log.d(TAG,"<< updateCollegeDetails()")
        Log.d(TAG,">> updateCollegeDetails()")
        return remoteRepo.callApiForUpdateCollegeDetails(token, code, updatecollegeDetails)
    }
}