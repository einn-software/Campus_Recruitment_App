package com.testexample.materialdesigntest.data.network.repository

import android.util.Log
import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.model.CollegeWiseResultResponse
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Flowable
import io.reactivex.Single

class ResultRemoteRepo : IResultRemoteRepo {

    private val TAG = "ResultRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForStudentResult(token: String, code: Int, roll: String, question_paper_id: String)
            : Single<Result> {
        Log.d(TAG, "<< callApiForStudentResult()")
        Log.d(TAG, ">> callApiForStudentResult()")
        return api.getStudentResult(token, code, roll, question_paper_id)
    }

    override fun callApiForStudentResultList(token: String, code: Int, question_paper_id: String): Flowable<List<CollegeWiseResultResponse>> {
        Log.d(TAG, "<< callApiForStudentResult()")
        Log.d(TAG, ">> callApiForStudentResult()")
        return api.getStudentResultList(token, code, question_paper_id)
    }

}