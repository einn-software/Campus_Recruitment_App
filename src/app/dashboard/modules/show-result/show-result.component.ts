import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService, JwtService } from 'src/app/core';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {
code: Number;
public paper: [];
public result: [];
public showPapers: boolean = true;
public show: boolean = false;
  question_paper_id: String;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private jwtService: JwtService) {
    const id = window.localStorage['id'];
    this.apiService.get(`/tpos/${id}`)
      .subscribe(
        data => {
         window.localStorage['code'] = data.code;
        }
      );

     this.code =  window.localStorage['code'];
     this.apiService.get(`/question-papers/${this.code}`).subscribe(
      data => {
       this.paper = data;
      }
    );
  }
  showResult(p){
    this.apiService.get(`/colleges/${this.code}/results/${p._id}`).subscribe(
      data => {
        this.showPapers = false;
        this.show = true;
       this.result = data;
      }
    );
  }

  ngOnInit(): void {
  }

}
