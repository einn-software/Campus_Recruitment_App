package com.testexample.materialdesigntest.data.database.model

import android.text.TextUtils
import android.util.Patterns
import com.testexample.materialdesigntest.data.database.interactor.IUserModel

class UserModel(override val userEmail: String,
                override val password: String) :
    IUserModel {
    override val isUserValid: Boolean
        get() = (!TextUtils.isEmpty(userEmail) &&
                Patterns.EMAIL_ADDRESS.matcher(userEmail).matches() &&
                password.length > 8)


}