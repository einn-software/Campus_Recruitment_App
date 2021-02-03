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
  public code : number;
  constructor(private collegeService: CollegeService) { }

  ngOnInit(): void {
    this.collegeService.getColleges().subscribe(
      res => {
        this.collegeList = res;
      })
  }
findCode(code){
  this.code = window.localStorage['code'] = code;

}
  removeCollege(col, index){
    if(window.confirm('Are you sure')){
      this.collegeService.deleteCollege(col._id).subscribe(
        success => {
          this.collegeList = this.collegeList.filter((co) => co !== col);
        }
      )
      this.collegeList.splice(index, 1);
    }
  }

}
