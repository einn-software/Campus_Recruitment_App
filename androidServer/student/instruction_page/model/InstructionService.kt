package Exam_App.student.instruction_page.model

import android.renderscript.Sampler
import retrofit2.Call
import retrofit2.http.GET


interface InstructionService {
    @GET("posts")
    fun getInstructionList(): Call<posts>
}

