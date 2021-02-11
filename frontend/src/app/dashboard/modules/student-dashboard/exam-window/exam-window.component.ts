import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit {
public paperId = window.localStorage['paperID'];
  constructor(private apiService: ApiService) {
   }

  ngOnInit(): void {
  }

}
