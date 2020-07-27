package com.innobitsystems.campusrecruiter.data.network.repository

import com.innobitsystems.campusrecruiter.IPlatformLog
import com.innobitsystems.campusrecruiter.SystemPlatformLog
import com.innobitsystems.campusrecruiter.data.model.College
import com.innobitsystems.campusrecruiter.data.network.model.TpoLoginRequest
import com.innobitsystems.campusrecruiter.data.network.model.UpdateCollegeDetails
import com.innobitsystems.campusrecruiter.data.network.retrofit.handelNetworkError
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

class CollegeDetailsRemoteRepoTest {

    private val Log: IPlatformLog = SystemPlatformLog()

    val TAG = "Testing CollegeDetailsRemoteRepoTest"
    lateinit var resultRemoteRepo: ICollegeDetailsRemoteRepo
    lateinit var token: String
    lateinit var tokenRepository: UserRemoteRepositoryTest
    val code = 2346

    @Before
    fun setUp() {
        val validTpoLoginRequest = TpoLoginRequest("anand@gmail.com", "anand344")
        tokenRepository = UserRemoteRepositoryTest()
        token = tokenRepository.setToken(validTpoLoginRequest).token
        resultRemoteRepo = CollegeDetailsRemoteRepo()
    }

    @After
    fun tearDown() {
    }

    //test function for callApiForGetCollegeDetails
    @Test
    fun callApiForGetCollegeDetails_withValidParams() {
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForGetCollegeDetails(token, code)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForGetCollegeDetails_withValidParams(): College Details is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForGetCollegeDetails_withValidParams(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertFalse("callApiForGetCollegeDetails_withValidParams(): Received Invalid College Details", response.name.isBlank() && response.code < 2000 && response.address.isBlank() && response.email.isBlank() && response.phone.isBlank())
        } else {
            fail("callApiForGetCollegeDetails_withValidParams(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForGetCollegeDetails_withInvalidToken() {
        var failure = ""
        resultRemoteRepo.callApiForGetCollegeDetails("", code)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForGetCollegeDetails_withInvalidToken(): College Details is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForGetCollegeDetails_withInvalidToken(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForGetCollegeDetails_withInvalidToken(): Verification Failed! as received College Details")
        } else {
            assertEquals("callApiForGetCollegeDetails_withInvalidToken(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForGetCollegeDetails_withInvalidCode() {
        var failure = ""
        resultRemoteRepo.callApiForGetCollegeDetails(token, 122)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForGetCollegeDetails_withInvalidCode(): College Details is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForGetCollegeDetails_withInvalidCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForGetCollegeDetails_withInvalidCode(): Verification Failed! as received College Details")
        } else {
            assertEquals("callApiForGetCollegeDetails_withInvalidCode(): Verification Failed as received $failure", "Please provide a valid code", failure)
        }
    }


    // Test functions for updating college details
    @Test
    fun callApiForUpdateCollegeDetails_withAllParams() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withAllParams(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withAllParams(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withAllParams(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withName() {
        val req = UpdateCollegeDetails("Nitra1 Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withName(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withName(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withName(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withAdddress() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay1 Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withAdddress(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withAdddress(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withAdddress(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withUniversity() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ1 Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withUniversity(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withUniversity(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withUniversity(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withEmail() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra1802@ntc.ac.in",
                "8090778901")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withEmail(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withEmail(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withEmail(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withPhone() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901111")
        var response = College("", "", 0, "", "", "", "")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe({ success ->
                    Log.i(TAG, "callApiForUpdateCollegeDetails_withPhone(): College Details After updation is $success")
                    response = success
                },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withPhone(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid name", req.name, response.name)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid address", req.address, response.address)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid university", req.university, response.university)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid email", req.email, response.email)
            assertEquals("callApiForUpdateCollegeDetails_withAllParams() received invalid phone", req.phone, response.phone)
        } else {
            fail("callApiForUpdateCollegeDetails_withPhone(): Verification failed with message: $failure")
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withInvalidToken() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails("", code, req)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForUpdateCollegeDetails_withInvalidToken(): College Details after updation is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withInvalidToken(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForUpdateCollegeDetails_withInvalidToken(): Verification Failed! as received College Details after updation")
        } else {
            assertEquals("callApiForUpdateCollegeDetails_withInvalidToken(): Verification Failed as received $failure", "Access denied", failure)
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withInvalidCode() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "nitra802@ntc.ac.in",
                "8090778901")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, 122, req)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForUpdateCollegeDetails_withInvalidCode(): College Details after updation is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withInvalidCode(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForUpdateCollegeDetails_withInvalidCode(): Verification Failed! as received College Details after updation")
        } else {
            assertEquals("callApiForUpdateCollegeDetails_withInvalidCode(): Verification Failed as received $failure", "Please provide a valid code", failure)
        }
    }

    @Test
    fun callApiForUpdateCollegeDetails_withInvalidEmailFormat() {
        val req = UpdateCollegeDetails("Nitra Technical Campus",
                "Sanjay Nagar, Ghaziabad",
                "APJ Abdul Kalam University", "cbcdefg.in",
                "8090778901")
        var failure = ""
        resultRemoteRepo.callApiForUpdateCollegeDetails(token, code, req)
                .handelNetworkError()
                .subscribe(
                        { success ->
                            Log.i(TAG, "callApiForUpdateCollegeDetails_withInvalidEmailFormat(): College Details after updation is $success")
                        },
                        { error ->
                            Log.e(TAG, "callApiForUpdateCollegeDetails_withInvalidEmailFormat(): ${error.localizedMessage}")
                            failure = error.message.toString()
                        })

        if (failure.isBlank()) {
            fail("callApiForUpdateCollegeDetails_withInvalidEmailFormat(): Verification Failed! as received College Details after updation")
        } else {
            assertEquals("callApiForUpdateCollegeDetails_withInvalidEmailFormat(): Verification Failed as received $failure", "\"email\" must be a valid email", failure)
        }
    }
}
