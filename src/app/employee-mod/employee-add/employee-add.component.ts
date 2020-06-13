import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Address } from 'src/app/models/address.model';
import { SelectItem } from 'primeng';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DesignationService } from 'src/app/services/designation.service';
import { Designation } from 'src/app/models/designation.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;
  employee: Employee;
  departments: SelectItem[];
  designation: SelectItem[];
  status: SelectItem[];
  empId: Number;
  isEdit: boolean = false;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private designationService: DesignationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.employee = new Employee();
    this.employee.address = new Address();

    // this.designation = [
    //   { label: 'Please select', value: '' },
    //   { label: 'Technical Analyst', value: 'Technical Analyst' },
    //   { label: 'Software Developer', value: 'Software Developer' },
    //   { label: 'Senior Software Developer', value: 'Senior Software Developer' },
    //   { label: 'Quality Assurance', value: 'Quality Assurance' },
    //   { label: 'QA', value: 'QA' },
    //   { label: 'UI Designer', value: 'UI Designer' },
    //   { label: 'BD', value: 'BD' },
    //   { label: 'Network Admin', value: 'Network Admin' },
    //   { label: 'HR', value: 'HR' },
    // ];

    this.status = [
      { label: 'Please Select', value: -1 },
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 }
    ];

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
      dateOfJoining: ['', Validators.required],
      status: ['', Validators.required],
      designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
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

    this.getAllDesignations();
  }

  getAllDesignations() {
    this.designationService.getAllDesignations().subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.designation = [];
        this.designation.push({label: 'Select Designation', value: 0});
        resObj.data.content.forEach(element => {
          this.designation.push({label: element.designation, value: element.id});
        });
      }
    }, error => {
      console.log(error);
      console.log(error);
    });
  }

  getDesignationById(id): Designation {
    let designation = new Designation();
    this.designation.forEach(element => {
      if (element.value === id) {
        designation.designation = element.label;
        designation.id = element.value;
      }
    });
    return designation;
  }

  getEmployeeById(empId) {
    this.employeeService.getEmployeeById(empId).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.employee = resObj.data;
        this.employeeForm.get('name').setValue(this.employee.name);
        this.employeeForm.get('department').setValue(this.employee.department.id);
        this.employeeForm.get('age').setValue(this.employee.age);
        this.employeeForm.get('address').setValue(this.employee.address.address);
        this.employeeForm.get('city').setValue(this.employee.address.city);
        this.employeeForm.get('state').setValue(this.employee.address.state);
        this.employeeForm.get('dateOfJoining').setValue(this.employee.dateOfJoining);
        this.employeeForm.get('designation').setValue(this.employee.designation);
        this.employeeForm.get('status').setValue(this.employee.status);
        this.employeeForm.get('email').setValue(this.employee.email);
      }
    });
  }

  addEmployee() {
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.age = this.employeeForm.get('age').value;
    this.employee.address.address = this.employeeForm.get('address').value;
    this.employee.address.city = this.employeeForm.get('city').value;
    this.employee.address.state = this.employeeForm.get('state').value;
    this.employee.dateOfJoining = this.employeeForm.get('dateOfJoining').value;
    this.employee.status = this.employeeForm.get('status').value;
    this.employee.designation = this.getDesignationById(this.employeeForm.get('designation').value);
    this.employee.email = this.employeeForm.get('email').value;

    if (this.isEdit) {
      this.employee.address.id = this.employee.address.id;
      this.employeeService.updateEmployee(this.employee).subscribe(response => {
        const resObj: any = response;
        if (resObj.resultCode === 'SUCCESS') {
          setTimeout(() => {this.router.navigate(['employee/employeeList']);}, 500);        
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    } else {
      this.employeeService.saveEmployee(this.employee).subscribe(response => {
        const resObj: any = response;
        if (resObj.resultCode === 'SUCCESS') {
          console.log(resObj.message === 'Constraint Violation: Duplicate entry');
          if (resObj.message === 'Constraint Violation: Duplicate entry') {
            this.message = 'Email already exists !!!';
          } else {
            setTimeout(() => {this.router.navigate(['employee/employeeList']);}, 500); 
          }          
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    }

  }

  getDepartmentById() {
    this.departmentService.getDepartmentById(this.employeeForm.get('department').value).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.employee.department = resObj.data;
      }
    });
  }

  cancel() {
    this.router.navigate(['employee/employeeList']);
  }

}
