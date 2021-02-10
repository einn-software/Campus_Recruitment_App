import { Component, OnInit} from '@angular/core';
import { ApiService } from "../../../core/services/api.service";
import { User, UserService } from '../../../core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public user: User = {} as User;
  public userForm: FormGroup;
  public role: string = '';
  public id: string;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ''
    })

    const data = window.location.pathname;
    this.role = data.slice(6, );
   }
   saveCode(){
    this.id = window.localStorage['id']
    this.apiService.get(`/tpos/${this.id}`).subscribe(
      res => {
        window.localStorage['code']= res.code;
      })
   }


  ngOnInit(): void {
    Object.assign(this.user, this.userService.getCurrentUser());
    let user = this.userForm.patchValue(this.user);
  }

}
