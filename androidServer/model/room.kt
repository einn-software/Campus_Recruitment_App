@Dao
interface adminDao{
    @query(value:"SELECT * FROM ADMIN WHERE email = email_id")
    fun getAdminEmail() : array<adminData>
}