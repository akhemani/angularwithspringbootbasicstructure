import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentHomeComponent } from './department-home/department-home.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { PrimeNgModule } from '../prime-ng.module';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentHomeComponent,
    DepartmentAddComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    PrimeNgModule
  ]
})
export class DepartmentModule { }
