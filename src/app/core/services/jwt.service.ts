import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }
getUserRole(){
return window.localStorage['userRole'];
}
  saveTokenAndRole(token: String, role: number) {
    window.localStorage['jwtToken'] = token;
    window.localStorage['userRole'] = role;
  }

  destroyTokenAndRole() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('userRole');
  }

}
