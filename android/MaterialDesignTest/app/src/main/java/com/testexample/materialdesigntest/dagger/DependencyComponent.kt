package com.testexample.materialdesigntest.dagger

import dagger.Component
import javax.inject.Singleton


@Singleton
// component is used to connect object to their dependencies
@Component(modules = [DependencyModule :: class])
interface DependencyComponent