// import instruction service
//import retrofit call
// import retrofit http get service


interface InstructionService {
    @GET(value:"Inastructions")
    fun getInstructionList()Call<List<Inastructions>>

        
    }
interface resultService {
    @GET(value:"ResultPage")
    fun getResultList()call<List<ResultPage>>
}