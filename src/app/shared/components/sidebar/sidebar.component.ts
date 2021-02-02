import { NgSwitch } from '@angular/common';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: string = '';

  constructor(
  ) {
    const data = window.location.pathname;
    this.role = data.slice(6, );
   }

  ngOnInit(): void {
  }

}
