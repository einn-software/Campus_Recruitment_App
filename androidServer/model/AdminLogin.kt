import android.text.TextUtils
import android.util.patterns

class AdminLogin (override val email : string , override val password : string) : IAdmin {

    override fun isDatavalid() : int {
        if(TextUtils.isEmpty(Email))
            return 0 // 0 error code is empty
        else if(!patterns.EMAIL_ADDRESS.matcher(email))
            return 1 //1 error code is wrong pattern. means email pattern missmatch
        else if (password.length<=6)
            return 2 // 2 error code shows password must be greater then 6
        else
            return -1 // error code -1 is success code
    }
}