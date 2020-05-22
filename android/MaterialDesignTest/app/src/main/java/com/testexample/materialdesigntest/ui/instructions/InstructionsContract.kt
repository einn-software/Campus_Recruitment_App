package com.testexample.materialdesigntest.ui.instructions

import com.testexample.materialdesigntest.data.model.Instructions
import com.testexample.materialdesigntest.ui.base.BaseContract


interface InstructionsContract {
    interface View : BaseContract.BaseView<Presenter> {
        fun showInstructions(instruction: Instructions)
    }
    interface Presenter : BaseContract.BasePresenter {
        fun fetchInstructions(id: String)
    }
}