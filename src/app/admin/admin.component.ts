import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Temp } from '../models/temp.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message: any;
  data: Temp[] = [];
  dd: Array<Temp> = [];

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    console.log('asdfasdf');
    this.adminService.getAdmin().subscribe(response => {
      console.log(response);
      response.forEach(element => {
        this.dd.push(element);
      });
      console.log(this.data);
    });
  }

}
