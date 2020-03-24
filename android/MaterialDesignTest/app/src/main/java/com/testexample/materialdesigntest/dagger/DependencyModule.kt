package com.testexample.materialdesigntest.dagger

import android.app.Application
import android.content.Context
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

// @Module tells Dagger that below class provides dependencies for a part of application
@Module

class DependencyModule(private val app: Application) {

    // Provides tells Dagger that method provides a certain dependency, 'Context' in this case...
    @Provides
    // Singleton tells Dagger to have single instance of a dependency
    @Singleton
    fun provideContext(): Context = app
}