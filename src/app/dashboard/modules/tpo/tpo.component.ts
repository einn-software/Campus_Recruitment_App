import { Component, OnInit } from '@angular/core';
import { Tpo } from './tpo.model';
import { TpoService } from './tpo.service';


@Component({
  selector: 'app-tpo',
  templateUrl: './tpo.component.html',
  styleUrls: ['./tpo.component.css']
})

export class TpoComponent implements OnInit {

  public tpoList: Tpo[] = [];

  constructor(private tpoService: TpoService) { }

  ngOnInit(): void {
    this.tpoService.getTPOs()
    .subscribe(
      res => this.tpoList = res
    )
  }

  removeTPO(tp, index){
    if(window.confirm('Are you sure?')){
      this.tpoService.deleteTPO(tp._id).subscribe(
        success => {
          this.tpoList = this.tpoList.filter((tpo) => tpo !== tp);
        }
      )
      this.tpoList.splice(index, 1);
    }
  }

}
