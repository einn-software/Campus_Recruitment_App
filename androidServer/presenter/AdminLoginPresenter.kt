import edmt.dev.kotlinmvplogin.model.user
import edmt.dev.kotlinmvplogin.view.IAdminLoginView
class AdminLoginPresenter(internal var IAdminLoginView):IAdminLoginPresenter {
    override fun onLogin(email : string , password : string){
        val user = (email, password)
        val loginCode = user.isDataValid()
        if (loginCode==0)
            IAdminLoginView.onLoginError("Email must not be null")
        //onLoginError is function which will decleared in the view of the admin login
        //onLoginSuccessr is also be a function which will decleared in the view of the admin login
        else if(loginCode==1)
            IAdminLoginView.onLoginError("Email must not be null")
        else if(loginCode==2)
            IAdminLoginView.onLoginError("Password must be grater then 6")
        else
            IAdminLoginView.onLoginError("Login Success")
    }
}