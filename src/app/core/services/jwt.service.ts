import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }
getUserRole(){
return window.localStorage['userRole'];
}
saveTokenAndRole(token: String, role: number, id: string, email: string) {
  window.localStorage['jwtToken'] = token;
  window.localStorage['userRole'] = role;
  window.localStorage['id'] = id;
  window.localStorage['email'] = email;
}

destroyTokenAndRole() {
  window.localStorage.removeItem('jwtToken');
  window.localStorage.removeItem('userRole');
  window.localStorage.removeItem('id');
  window.localStorage.removeItem('code');
  window.localStorage.removeItem('email');
  }

}
