import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  columns: any[];
  loading: boolean = true;
  totalRecords: Number;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.columns = [
      {field: 'name', header: 'Name'},
      {field: 'department.name', header: 'Department'},
      {field: 'age', header: 'Age'},
      {field: 'address.address', header: 'Address'},
      {field: 'dateOfJoining', header: 'Date of Joining'}
    ];

    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployess().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        if (resObj.data.content.length > 0) {
          this.employees = resObj.data.content;
          this.totalRecords = resObj.data.totalElements;
        }        
      } else {
        alert('Error !!!');
      }
      setTimeout(() => {this.loading = false;}, 500);        
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  loadLazyEmployeeTableData($event) {
    console.log('event');
    console.log(event);
  }

  addEmployee() {
    this.router.navigate(['employee/addEmployee']);
  }

  editEmployee(empId) {
    this.router.navigate(['employee/addEmployee'], {
      queryParams: {
        'id': empId
      }
    });
  }

}
