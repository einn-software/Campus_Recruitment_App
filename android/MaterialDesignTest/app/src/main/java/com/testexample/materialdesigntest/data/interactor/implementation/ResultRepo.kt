package com.testexample.materialdesigntest.data.interactor.implementation

import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.interfaces.IResultRepo
import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.model.CollegeWiseResultResponse
import com.testexample.materialdesigntest.data.network.repository.IResultRemoteRepo
import com.testexample.materialdesigntest.data.network.repository.ResultRemoteRepo
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

