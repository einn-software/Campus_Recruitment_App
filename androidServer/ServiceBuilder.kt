import okhttp3.okHttpClient
import okhttp3.logging.HttpLoggingInterceptor// shows the all possible exceptions occured during request and response
import retrofit2.Retrofit
import retrofit2.convertor.gson.GsonConertFactory

object ServiceBuilder {
     //before relese change this url to our live server url
    private const val URL="url of the api" // url of the api for the instruction page which is converted in kotlin code
    private const val URL="url of the result api" // api url for the result page
    // we create logger here with the level body
    private val logger : HttpLoggingInterceptor! = HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)
//    create okHTTP client  and also define add interceptor
    private val okHttp: OkHttpClient.builder()
//        create retrofit builder and gson convertor factory and the ok http client library
    private val builder:retrofit.Builder=Retrofit.Builder().baseUrl("URL of the instruction api")
    .addConvertFactory(GsonconvertFactory())
    .client(okHttp.build())
    private val builder:retrofit.Builder=Rtrofit.Builder().baseUrl("url of the result page api")
            .addConvertFactory(GsonconvertFactory()).client(okHttp.build())
//    create a retrofit instence
//    it implements the class which is defined in the instruction service. we will call the function
//    which is implemenrts in the service builder
    private val retrofit:Retrofit = builder.build()
    fun <T> buildService(serviceType: class<T>) T{
        return retrofit.create(serviceType)
    }


}