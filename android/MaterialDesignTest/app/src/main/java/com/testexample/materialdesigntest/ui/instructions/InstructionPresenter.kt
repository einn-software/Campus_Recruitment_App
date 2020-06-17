package com.testexample.materialdesigntest.ui.instructions

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.PreExamInstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IPreExamInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



class InstructionPresenter(private var view: InstructionsContract.View?):
    InstructionsContract.Presenter {

    val TAG = "Instructions Presenter"

    private lateinit var repository: IPreExamInstructionsRepo
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager

    override fun fetchInstructions(instructionId: String) {

        repository = PreExamInstructionsRepo()
        sessionManager = SessionManager(view!!.setContext())
        Log.d(TAG,"fetch instructions at token ${sessionManager.getUserAuthToken()}")

        view?.let {
            subscriptions.add(
                repository
                .getInstructionsFromRemoteRepo(sessionManager.getUserAuthToken()!!,
                    instructionId)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                    { instructions ->
                        view!!.showInstructions(instructions!!)
                    },
                    {error -> println(error.toString())},
                    { println("instructions fetched successfully")}
                ))
        }
    }

    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }
}