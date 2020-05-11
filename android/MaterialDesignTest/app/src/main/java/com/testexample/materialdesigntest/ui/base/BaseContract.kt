package com.testexample.materialdesigntest.ui.base

import android.content.Context

interface BaseContract {

    interface BaseView<T> {
        fun setPresenter(presenter : T)
        fun setContext():Context
    }

    interface BasePresenter {
        fun onDestroy()
    }
}