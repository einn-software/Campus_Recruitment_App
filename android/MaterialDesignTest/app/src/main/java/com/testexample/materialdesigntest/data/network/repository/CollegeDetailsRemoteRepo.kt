package com.testexample.materialdesigntest.data.network.repository

import android.annotation.SuppressLint
import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.model.College
import com.testexample.materialdesigntest.data.network.model.UpdateCollegeDetails
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single


class CollegeDetailsRemoteRepo: ICollegeDetailsRemoteRepo {
    private val api: GetDataServices = GetDataServices.create()
    val TAG = "CollegeDetailsRemoteRepo"

    @SuppressLint("LongLogTag")
    override fun callApiForGetCollegeDetails(token: String, code: Int): Single<College> {
        HyperLog.d(TAG,"<< callApiForUpdateCollegeDetails()")
        HyperLog.d(TAG,">> callApiForUpdateCollegeDetails()")
        return api.getCollege(token, code)
    }

    @SuppressLint("LongLogTag")
    override fun callApiForUpdateCollegeDetails(token: String, code: Int, updateCollegeDetails: UpdateCollegeDetails):
            Single<College> {
        HyperLog.d(TAG,"<< callApiForUpdateCollegeDetails()")
        HyperLog.d(TAG,">> callApiForUpdateCollegeDetails()")
        return api.updateCollege(token, code, updateCollegeDetails)
    }


}