package com.testexample.materialdesigntest.ui.base

interface BaseContract {

    interface BaseView<T> {
        fun setPresenter(presenter : T)
    }

    interface BasePresenter {
        fun onDestroy()
    }
}