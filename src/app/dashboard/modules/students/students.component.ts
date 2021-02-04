import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from './student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  sList= [];
  public code : number;
  constructor(private studentService: StudentService, private route: ActivatedRoute) {console.log(this.route) }

  ngOnInit(): void {
    this.code = window.localStorage['code'];
    this.studentService.getStudent(this.code).subscribe(
      res => {
        this.sList = res;
      })
  }
  removeCollege(student, index){
    if(window.confirm('Are you sure')){
      this.studentService.deleteStudent(student._id).subscribe(
        success => {
          this.sList = this.sList.filter((co) => co !== student);
        }
      )
      this.sList.splice(index, 1);
    }
  }

}
