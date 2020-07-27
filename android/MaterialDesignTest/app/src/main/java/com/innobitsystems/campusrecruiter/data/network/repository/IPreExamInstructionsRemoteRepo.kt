package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.data.model.Instructions
import io.reactivex.Flowable



interface IPreExamInstructionsRemoteRepo {
    fun callInstructionsApi(token:String, id: String):
            Flowable<Instructions>
}