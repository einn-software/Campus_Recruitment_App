import { Component, OnInit, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  sideBarOpen = true;
  showSideNav : boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events
  .pipe(filter(event => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
    if(event.url === '/instructions/exam'){
      this.showSideNav = false;
    };
  });
   }

  ngOnInit(): void {

  }

  sideBarToggler(event: Event){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
