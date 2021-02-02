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
        if([
          "/dash/admins",
          "/dash",
          "/questions",
          "/create-question",
          "/question-papers",
          "/instructions",
          "/create-instruction",
          "/admin",
          "/create-admin",
          "/colleges",
          "/create-college",
          "/tpo",
          "/create-tpo",
          "/students"
        ].indexOf(event['url']) >= 0){
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
        var latUrl = event['url'];
        if(latUrl.match('/edit-admin')){
          this.showHead = false;
        }
        var atUrl = event['url'];
        if(atUrl.match('/edit-college')){
          this.showHead = false;
        }
        var aUrl = event['url'];
        if(aUrl.match('/edit-tpo')){
          this.showHead = false;
        }
      }
    });
  }

  ngOnInit() {
    this.userService.populate();
  }
}
