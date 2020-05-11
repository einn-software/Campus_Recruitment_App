package com.testexample.materialdesigntest.ui.instructions

import com.testexample.materialdesigntest.data.interactor.implementation.InstructionsRepo
import com.testexample.materialdesigntest.data.interactor.interfaces.IInstructionsRepo
import com.testexample.materialdesigntest.data.model.Instructions
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import java.util.*


class InstructionPresenter(private var view: InstructionsContract.View?):
    InstructionsContract.Presenter {

    private lateinit var repository: IInstructionsRepo
    private var subscriptions = CompositeDisposable()

    override fun fetchInstructions(code: String, date: Date) {

        repository = InstructionsRepo()

        view.let {
            subscriptions.add(
                repository
                .getInstructionsFromRemoteRepo(code, date)
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