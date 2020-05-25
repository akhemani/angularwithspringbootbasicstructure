import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {

  departmentForm: FormGroup
  department: Department;
  departmentId: Number;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.departmentId = params['id'] === undefined ? 0 : params['id'];
    });

    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      floorNumber: ['', Validators.required],
    });

    if (this.departmentId) {
      this.isEdit = true;
      this.getDepartmentById(this.departmentId);
    }
  }

  getDepartmentById(id) {
    this.departmentService.getDepartmentById(id).subscribe(response => {
      const resObj: any = response;
      if (resObj.resultCode === 'SUCCESS') {
        this.departmentForm.get('name').setValue(resObj.data.name);
        this.departmentForm.get('floorNumber').setValue(resObj.data.floorNumber);
      }
    }, error => {
      console.log('error');
      console.log(error);
    });
  }

  addDepartment() {
    this.department = new Department();
    this.department.name = this.departmentForm.get('name').value;
    this.department.floorNumber = this.departmentForm.get('floorNumber').value;
    if (this.isEdit) {
      this.department.id = this.departmentId;
      this.departmentService.updateDepartment(this.department).subscribe(response => {
        const resObj: any = response;
        if (resObj.resultCode === 'SUCCESS') {
          this.router.navigate(['department/list']);
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    } else {
      this.departmentService.saveDepartment(this.department).subscribe(response => {
        const resObj: any = response;
        if (resObj.resultCode === 'SUCCESS') {
          this.router.navigate(['department/list']);
        }
      }, error => {
        console.log('error');
        console.log(error);
      });
    }    
  }

  cancel() {
    this.router.navigate(["department/list"]);
  }

}
