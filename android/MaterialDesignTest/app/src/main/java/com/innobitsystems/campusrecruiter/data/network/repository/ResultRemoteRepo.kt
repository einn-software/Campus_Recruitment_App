package com.innobitsystems.campusrecruiter.data.network.repository

import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.data.network.model.CollegeWiseResultResponse
import com.innobitsystems.campusrecruiter.data.network.retrofit.GetDataServices
import io.reactivex.Flowable
import io.reactivex.Single

class ResultRemoteRepo : IResultRemoteRepo {

    private val TAG = "ResultRemoteRepo"
    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForStudentResult(token: String, code: Int, roll: String, question_paper_id: String)
            : Single<Result> {
        HyperLog.d(TAG, "<< callApiForStudentResult()")
        HyperLog.d(TAG, ">> callApiForStudentResult()")
        return api.getStudentResult(token, code, roll, question_paper_id)
    }

    override fun callApiForStudentResultList(token: String, code: Int, question_paper_id: String): Flowable<List<CollegeWiseResultResponse>> {
        HyperLog.d(TAG, "<< callApiForStudentResult()")
        HyperLog.d(TAG, ">> callApiForStudentResult()")
        return api.getStudentResultList(token, code, question_paper_id)
    }

}