import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Address } from 'src/app/models/address.model';
import { SelectItem } from 'primeng';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  employee: Employee;
  departments: SelectItem[];
  department: Department;
  empId: Number;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { console.log('asdf'); }

  ngOnInit(): void {

    console.log('asdf 2');

    this.route.queryParams.subscribe(params => {
      this.empId = params['id'] === 'undefined' ? 0 : params['id'];
    });

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      dateOfJoining: ['', Validators.required]
    });

    this.departmentService.getAllDepartments().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.departments = [];
        this.departments.push({label: 'Select department', value: 0});
        resObj.data.content.forEach(element => {          
          this.departments.push({label: element.name, value: element.id});
        });
      }
    });

    if (this.empId > 0) {
      this.isEdit = true;
      this.getEmployeeById(this.empId);
    }

  }

  getEmployeeById(empId) {
    this.employeeService.getEmployeeById(empId).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.employee = new Employee();
        this.employee = resObj.data;
        this.employeeForm.get('name').setValue(this.employee.name);
        this.employeeForm.get('department').setValue(this.employee.department.id);
        this.employeeForm.get('age').setValue(this.employee.age);
        this.employeeForm.get('address').setValue(this.employee.address.address);
        this.employeeForm.get('city').setValue(this.employee.address.city);
        this.employeeForm.get('state').setValue(this.employee.address.state);
        this.employeeForm.get('dateOfJoining').setValue(this.employee.dateOfJoining);
      }
    });
  }

  addEmployee() {
    this.employee = new Employee();
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.age = this.employeeForm.get('age').value;
    this.employee.department = this.department;
    this.employee.address = new Address();
    this.employee.address.address = this.employeeForm.get('address').value;
    this.employee.address.city = this.employeeForm.get('city').value;
    this.employee.address.state = this.employeeForm.get('state').value;
    this.employee.dateOfJoining = this.employeeForm.get('dateOfJoining').value;

    this.employeeService.saveEmployee(this.employee).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        setTimeout(() => {this.router.navigate(['employee/employeeList']);}, 500);
      }
    }, error => {

    });
  }

  getDepartmentById() {
    this.departmentService.getDepartmentById(this.employeeForm.get('department').value).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.department = new Department();
        this.department = resObj.data;
      }
    });
  }

  cancel() {
    this.router.navigate(['employee/employeeList']);
  }

}
