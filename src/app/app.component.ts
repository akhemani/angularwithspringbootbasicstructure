import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor() {
    console.log('constructor');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit()');
  }
  
  ngOnInit(): void {
    console.log('ngOnInit');
  }

  enableAdminOptions(): boolean {
    return (localStorage.getItem("type")==='1');
  }
  
}
