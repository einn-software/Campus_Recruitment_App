import { Component, OnInit } from '@angular/core';
import { StudentService } from '../students/student.service';
import { TpoService } from '../tpo/tpo.service';
import { Student } from '../students/student.model';
import { Tpo } from '../tpo/tpo.model';
@Component({
  selector: 'app-tpo-dashboard',
  templateUrl: './tpo-dashboard.component.html',
  styleUrls: ['./tpo-dashboard.component.css']
})
export class TpoDashboardComponent implements OnInit {
  public studentLength: number;
  public tpoLength: number;
  public code: string;
  public studentList: Student[] = [];
  public tpoList: Tpo[] = [];
  constructor(private tpo: TpoService,
    private students: StudentService,
    private tpoService: TpoService) { }

  ngOnInit(): void {
    this.tpo.getTPOs()
    .subscribe((res) => {
      const id = window.localStorage['id'];
        this.tpoService.getTpo(`${id}`)
       .subscribe(
        data => {
          window.localStorage['code'] = data.code;
         for(let i =0; i<res.length; i++){
           if(res[i].code === data.code){
               this.tpoList.push(res[i]);

           }
         }
         this.tpoLength = this.tpoList.length
        }
      )
    })
    let code = window.localStorage['code'];
    window.localStorage.removeItem('code');
    this.students.getStudent(code).subscribe((res) => {
      this.studentList = res;
      // console.log(res);
      this.studentLength = res.length
    })
  }

}
