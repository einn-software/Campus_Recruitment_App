import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public adminList : User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAdmins()
    .subscribe(
      res => this.adminList = res
    )
  }

  removeAdmin(amd, index){
    if(window.confirm('Are you sure?')){
      this.adminService.deleteAdmin(amd._id).subscribe(
        success => {
          this.adminList = this.adminList.filter((ad) => ad !== amd);
        }
      )
      this.adminList.splice(index, 1);
    }
  }
}
