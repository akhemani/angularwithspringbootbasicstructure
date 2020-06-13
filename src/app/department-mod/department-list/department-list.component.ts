import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  departmentColumns: any[];
  departmentList: Department[];
  totalRecords: Number;
  loading: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.departmentColumns = [
      {field: 'id', header: 'Id'},
      {field: 'name', header: 'Name'},
      {field: 'floorNumber', header: 'Floor Number'},
      {field: '', header: ''}
    ];

    this.getAllDepartments();
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(response => {
      this.loading = true;
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        
        setTimeout(() => {
          if (resObj.data.content.length > 0) {
            this.departmentList = resObj.data.content;
            this.totalRecords = resObj.data.totalElements;
            this.loading = false;
          } else {
            this.departmentList = [];
            this.totalRecords = resObj.data.totalElements;
            this.loading = false;
          }
        }, 500);
      }
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  addDepartment() {
    this.router.navigate(["department/add"]);
  }

  editDepartment(id) {
    this.router.navigate(['department/add'], {
      queryParams : {
        'id' : id
      }
    });
  }

  deleteDepartment(id) {
    this.departmentService.deleteDepartment(id).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.getAllDepartments();
      }  
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

}
