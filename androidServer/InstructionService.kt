import retrofit2.call
import retrofit2.http.GET


interface InstructionService {
    @GET(value:"Inastructions")
    fun getInstructionList()Call<List<Inastructions>>

        
    }
interface resultService {
    @GET(value:"ResultPage")
    fun getResultList()call<List<ResultPage>>
}