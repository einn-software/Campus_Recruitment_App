import { Component, OnInit } from '@angular/core';
import { College } from './colleges.model';
import { CollegeService } from './colleges.service';


@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {

  public collegeList : College[] = [];

  constructor(private collegeService: CollegeService) { }

  ngOnInit(): void {
    this.collegeService.getColleges().subscribe(
      res => {
        this.collegeList = res;
      }
    )
  }

}
