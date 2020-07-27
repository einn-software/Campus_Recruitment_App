package com.innobitsystems.campusrecruiter.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
import com.innobitsystems.campusrecruiter.data.interactor.interfaces.IResultRepo
import com.innobitsystems.campusrecruiter.data.model.Result
import com.innobitsystems.campusrecruiter.data.network.model.CollegeWiseResultResponse
import com.innobitsystems.campusrecruiter.data.network.repository.IResultRemoteRepo
import com.innobitsystems.campusrecruiter.data.network.repository.ResultRemoteRepo
import io.reactivex.Flowable
import io.reactivex.Single

class ResultRepo : IResultRepo {

    private val TAG = "ResultRepo"
    private val remoteRepo: IResultRemoteRepo = ResultRemoteRepo()

    override fun getStudentResultFromRemoteRepo(token: String, code: Int, roll: String, question_paper_id: String): Single<Result> {
        HyperLog.d(TAG, "<< getInstructionsFromRemoteRepo()")
        HyperLog.d(TAG, ">> getInstructionsFromRemoteRepo()")
        return remoteRepo.callApiForStudentResult(token, code, roll, question_paper_id)
    }

    override fun getStudentResultListFromRemoteRepo(token: String, code: Int, question_paper_id: String): Flowable<List<CollegeWiseResultResponse>> {
        HyperLog.d(TAG, "<< getInstructionsFromRemoteRepo()")
        HyperLog.d(TAG, ">> getInstructionsFromRemoteRepo()")
        return remoteRepo.callApiForStudentResultList(token, code, question_paper_id)
    }
}

