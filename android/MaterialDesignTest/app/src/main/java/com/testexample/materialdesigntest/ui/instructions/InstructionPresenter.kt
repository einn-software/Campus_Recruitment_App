package com.testexample.materialdesigntest.ui.instructions

import com.hypertrack.hyperlog.HyperLog
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
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

        HyperLog.d(TAG, "<< fetchInstructions")
        repository = PreExamInstructionsRepo()
        sessionManager = SessionManager(view!!.setContext())

        view?.let {
            subscriptions.add(
                    repository.getInstructionsFromRemoteRepo(sessionManager.getUserAuthToken()!!,
                        instructionId)
                            .subscribeOn(Schedulers.io())
                            .observeOn(AndroidSchedulers.mainThread())
                            .handelNetworkError()
                            .subscribe(
                                    { instructions ->
                                        HyperLog.i(TAG, "Successfully Fetch instruction")
                                        view!!.showInstructions(instructions!!)
                                    },
                                    { error -> HyperLog.e(TAG, "Error in Fetching instruction: " +
                                            error.message.toString()
                                    ) },
                                    { HyperLog.d(TAG, "Fetch instruction query completed") }
                            ))
        }
        HyperLog.d(TAG, ">> fetchInstructions")
    }

    override fun onDestroy() {
        subscriptions.clear()
        view = null
    }
}