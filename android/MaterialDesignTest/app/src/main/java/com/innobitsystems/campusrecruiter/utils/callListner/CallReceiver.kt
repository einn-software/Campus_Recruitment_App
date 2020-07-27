package com.innobitsystems.campusrecruiter.utils.callListner

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.PhoneStateListener
import android.telephony.TelephonyManager


class CallReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        val telephony = context!!.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        val customPhoneListener = MyPhoneStateListener()

        telephony.listen(customPhoneListener, PhoneStateListener.LISTEN_CALL_STATE)

        val bundle = intent!!.extras
        val phoneNumber = bundle!!.getString("incoming_number")

        val stateStr = intent.extras!!.getString(TelephonyManager.EXTRA_STATE)

        var state = 0
        if (stateStr == TelephonyManager.EXTRA_STATE_OFFHOOK) {
            state = TelephonyManager.CALL_STATE_OFFHOOK
        }

        if (phoneNumber == null || "" == phoneNumber) {
            return
        }
        customPhoneListener.onCallStateChanged(context, state, phoneNumber)
    }
}