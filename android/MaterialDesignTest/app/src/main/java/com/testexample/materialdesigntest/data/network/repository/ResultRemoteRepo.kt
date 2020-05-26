package com.testexample.materialdesigntest.data.network.repository

import com.testexample.materialdesigntest.data.model.Result
import com.testexample.materialdesigntest.data.network.retrofit.GetDataServices
import io.reactivex.Single

class ResultRemoteRepo: IResultRemoteRepo {

    private val api: GetDataServices = GetDataServices.create()

    override fun callApiForResultWithQuesId(token: String, code: Int, question_paper_id: String): Single<List<Result>> {
        return api.getResultFromQuesId(token, code, question_paper_id)
    }

    override fun callApiForResultWithStudentId(token: String, code: Int, student_id: String): Single<Result> {
        return api.getResultFromStudentId(token, code, student_id)
    }

    override fun saveResult(result: Result) {
        TODO("Not yet implemented")
    }
}