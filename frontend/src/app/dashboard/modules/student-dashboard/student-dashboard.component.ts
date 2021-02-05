import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  public code: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let id = window.localStorage['id'];
    this.apiService.get(`/students/${id}`).subscribe(data=>{
      console.log(data);
      this.code = window.localStorage['code'] = data.code;
    });
  }

}
