package com.testexample.materialdesigntest.ui.instructions

import android.util.Log
import com.testexample.materialdesigntest.data.interactor.implementation.InstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.data.session.SessionManager
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



class InstructionPresenter(private var view: InstructionsContract.View?):
    InstructionsContract.Presenter {

    val TAG = "Instructions Presenter"

    private lateinit var repository: IInstructionsRepo
    private var subscriptions = CompositeDisposable()
    private lateinit var sessionManager: SessionManager

    override fun fetchInstructions(code: String, date: String) {

        repository = InstructionsRepo()
        sessionManager = SessionManager(view!!.setContext())
        Log.d(TAG,"fetch instructions at token ${sessionManager.getAuthToken()}")

        view.let {
            subscriptions.add(
                repository
                .getInstructionsFromRemoteRepo(sessionManager.getAuthToken()!!, code, date)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                    { instructions: Instructions? ->
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