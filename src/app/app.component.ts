import { Component, OnInit } from '@angular/core';
import { UserService } from './core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public showHead: boolean = false;
  public showFoot: boolean = false;
  constructor (
    private userService: UserService,
    private router: Router
  ) {
    router.events.forEach((event)=> {
      if(event instanceof NavigationStart){
        if(["/", "/dash", "/questions", "/question-papers", "/instructions", "/admin", "/colleges", "/tpo", "/students", "/create-question", "/create-instruction"].indexOf(event['url']) >= 0){
          this.showHead = false;
        }else{
          this.showHead = true;
        }
        var currentUrl = event['url'];
        if(currentUrl.match('/edit-question')){
          this.showHead = false;
        }
        var latestUrl = event['url'];
        if(latestUrl.match('/edit-instruction')){
          this.showHead = false;
        }
      }
    });
  }

  ngOnInit() {
    this.userService.populate();
  }
}
