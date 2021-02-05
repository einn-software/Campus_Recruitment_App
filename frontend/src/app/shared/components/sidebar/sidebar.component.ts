import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ApiService } from "../../../core/services/api.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: string = '';
  id: string;
  constructor(private apiService: ApiService
  ) {
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
  }

}
