import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core';
import { paperData } from "../student-dash";

@Component({
  selector: 'app-exam-window',
  templateUrl: './exam-window.component.html',
  styleUrls: ['./exam-window.component.css']
})
export class ExamWindowComponent implements OnInit {

  constructor() {
    console.log("passed", paperData);
   }

  ngOnInit(): void {

  }

}
