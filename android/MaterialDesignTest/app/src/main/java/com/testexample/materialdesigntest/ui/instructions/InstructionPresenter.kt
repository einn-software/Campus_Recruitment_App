package com.testexample.materialdesigntest.ui.instructions

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.network.retrofit.handelNetworkError
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers


class InstructionPresenter(private var view: InstructionsContract.View?) :
        InstructionsContract.Presenter {

    val TAG = "Instructions Presenter"

    private lateinit var repository: IPreExamInstructionsRepo
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager

    override fun fetchInstructions(instructionId: String) {

        Log.d(TAG, "<< fetchInstructions")
        repository = PreExamInstructionsRepo()
        sessionManager = SessionManager(view!!.setContext())

        view?.let {
            subscriptions.add(
                    repository.getInstructionsFromRemoteRepo(sessionManager.getUserAuthToken()!!, instructionId)
                            .subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .handelNetworkError()
                            .subscribe(
                                    { instructions ->
                                        Log.i(TAG, "Successfully Fetch instruction")
                                        view!!.showInstructions(instructions!!)
                                    },
                                    { error -> Log.e(TAG, "Error in Fetching instruction: ${error.message.toString()}") },
                                    { Log.d(TAG, "Fetch instruction query completed") }
                            ))
        }
        Log.d(TAG, ">> fetchInstructions")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}