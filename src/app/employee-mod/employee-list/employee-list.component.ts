import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng';
import { DesignationService } from 'src/app/services/designation.service';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { Designation } from 'src/app/models/designation.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  designations: any[];
  departments: any[];
  employees: Employee[];
  columns: any[];
  loading: boolean = true;
  totalRecords: Number;
  status: SelectItem[];
  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private departmentService: DepartmentService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.employee = new Employee();
    this.employee.department = new Department();
    this.employee.designation = new Designation();

    this.columns = [
      {field: 'name', header: 'Name'},
      {field: 'department.name', header: 'Department'},
      {field: 'age', header: 'Age'},
      {field: 'address.address', header: 'Address'},
      {field: 'dateOfJoining', header: 'Date of Joining'}
    ];

    this.status = [
      { label: 'All', value: -1 },
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 }
    ];

    this.getAllEmployees();
    this.getAllDesignations();
    this.getAllDepartments();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployess().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        setTimeout(() => {
          this.employees = resObj.data.content;
          this.totalRecords = resObj.data.totalElements;
          this.loading = false;
        }, 1500);
      }      
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  getAllDesignations() {
    this.designationService.getAllDesignations().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.designations = [];
        this.designations.push({ label: 'All', value: 0 });
        resObj.data.content.forEach(element => {
          this.designations.push({ label: element.designation, value: element.id });
        });
      }
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.departments = [];
        this.departments.push({ label: 'All', value: 0 });
        resObj.data.content.forEach(element => {
          this.departments.push({ label: element.name, value: element.id });
        });
      }
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

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.getAllEmployees();
      }
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  search(searchedText) {
    if (searchedText.length > 0) {
      this.employeeService.searchEmployee(searchedText).subscribe(response => {
        const resObj: any = response;
        if (resObj.resultCode === 'SUCCESS') {
          this.employees = resObj.data.content;
          this.totalRecords = resObj.data.totalElements;
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    } else {
      this.getAllEmployees();
    }
  }

  filterResult() {
    this.loading = true;
    if (this.employee.status === undefined) {
      this.employee.status = -1;
    }
    this.employeeService.filterEmployees(this.employee).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {        
        setTimeout(() => {
          this.employees = resObj.data.content;
          this.totalRecords = resObj.data.totalElements;
          this.loading = false;
        }, 1500);
      }
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  reset() {
    this.employee.dateOfJoining = '';
    this.employee.status = null;
    this.employee.designation.id = null;
    this.employee.department.id = null;
  }

}
