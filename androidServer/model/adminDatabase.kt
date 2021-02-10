import androidx .room.entity
@entity
data class adminData{
    @primerykey(autogenerate = true)
    val id: int,
    @ColumnInfo(name = "admin_email_id")
    val email: string,
    ColumnInfo(name = "admin_password")
    val password: string
}