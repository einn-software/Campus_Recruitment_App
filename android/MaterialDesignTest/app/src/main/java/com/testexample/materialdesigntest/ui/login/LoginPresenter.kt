package com.testexample.materialdesigntest.ui.login

import com.testexample.materialdesigntest.data.interactor.IUserRepository
import com.testexample.materialdesigntest.ui.login.LoginContract.View
import com.testexample.materialdesigntest.data.repository.UserRepository
import io.reactivex.Scheduler
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers



/**\
 * handles the actions from the view and updates the UI as required
 */
// Presenter Constructor takes view Instance
class LoginPresenter(private var view: View?,private val userRepository: IUserRepository) :
    LoginContract.Presenter {

    private var subscriptions = CompositeDisposable()

    override fun onLogin(userEmail: String, password: String) {


         val isLoginSuccess = userRepository
             .isUserValid(userEmail, password).subscribeOn(Schedulers.io())
             .observeOn(AndroidSchedulers.mainThread())
             .subscribe(
                 {s -> view?.onLoginResult("success") },
                 {e -> view?.onLoginResult(e.localizedMessage!!)},
                 { }
             )

        subscriptions.add(isLoginSuccess)


    }

    override fun onDestroy() {
        subscriptions.clear()
        view  = null
    }


}