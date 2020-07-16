package com.testexample.materialdesigntest.utils

class Constants {
    companion object {

        internal const val BASE_URL = "http://45.122.120.109:3800/"
        internal const val API_KEY = ""
        internal const val APP_DB_NAME = ""
        internal const val PREF_NAME = ""
        internal const val NO_EXAM_FOUND = "You have no Upcoming Exams yet!,\n please comeback later"
        internal const val EMPTY_EMAIL_ERROR = 1001
        internal const val EMPTY_ROLL_NO_ERROR = 1001
        internal const val INVALID_EMAIL_ERROR = 1002
        internal const val INVALID_ROLL_NO_ERROR = 1002
        internal const val EMPTY_PASSWORD_ERROR = 1003
        internal const val EMPTY_CODE_ERROR = 1005
        internal const val LOGIN_FAILURE = 1004
        internal const val PERMISSION_CODE = 1101
        internal const val REQUEST_CODE_PICK_FILE = 101
        internal const val NULL_INDEX = -1L

        // Constants for Session
        internal const val EMAIL = "email"
        internal const val TOKEN = "token"
        internal const val ID = "_id"
        internal const val USERTYPE = "user_type"

        //Constants for Activities
        internal const val QUESTION_PAPER = "question_paper"
        internal const val INSTRUCTION_ID = "instructions_id"
        internal const val STUDENT = "student"
        internal const val CODE = "college_code"
        internal const val ROLL = "roll_no"
        internal const val QUESTION_PAPER_ID = "question_paper_id"
        internal const val ANSWERED = 4
        internal const val MARKED = 5

	//Constants for College
        internal const val COLLEGE_EMAIL = "email"
        internal const val COLLEGE_NAME = "name"
        internal const val COLLEGE_ADDRESS = "address"
        internal const val COLLEGE_UNIVERSITY = "university"
        internal const val COLLEGE_PHONE = "phone"
	
	//Constants for Result table column
        internal const val NAME = "Name"
        internal const val QUESTION_ATTEMPT = "Question Attempt"
        internal const val CORRECT_ATTEMPT = "Correct Attempt"
        internal const val TOTAL_MARKS = "Total Marks"

        //registration link
        internal const val WEBSITE_LINK = "https://www.google.com/"
        internal const val LOGSEXPIRYTIME = 172800
        internal const val CARE_NUMBER = "569"
        internal const val SUCCESS = 200

        enum class LoggedInMode constructor(val type: Int) {
            LOGGED_IN_MODE_LOGGED_OUT(0),
            LOGGED_IN_MODE_SERVER(1)
        }


    }


}
