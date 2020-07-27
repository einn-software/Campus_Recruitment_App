package com.innobitsystems.campusrecruiter.utils.callListner

import android.content.Context
import android.telephony.PhoneStateListener
import android.telephony.TelephonyManager
import com.innobitsystems.campusrecruiter.utils.Constants
import com.innobitsystems.campusrecruiter.utils.Logger
import java.util.*

class MyPhoneStateListener : PhoneStateListener() {

    private var lastState = TelephonyManager.CALL_STATE_IDLE
    private var callStartTime: Date? = null
    private var isIncoming = false

    fun onCallStateChanged(context: Context, state: Int, phoneNumber: String) {
        if (state == TelephonyManager.CALL_STATE_OFFHOOK) {
            if (lastState != TelephonyManager.CALL_STATE_RINGING) {
                isIncoming = false
                callStartTime = Date()
                if (phoneNumber == Constants.CARE_NUMBER) {
                    Logger().sendLogs(context)
                }
            }
        }
    }
}
