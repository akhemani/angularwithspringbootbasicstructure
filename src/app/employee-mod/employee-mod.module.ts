import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeModRoutingModule } from './employee-mod-routing.module';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { PrimeNgModule } from '../prime-ng.module';


@NgModule({
  declarations: [
    EmployeeHomeComponent,
    EmployeeListComponent,
    EmployeeAddComponent
  ],
  imports: [
    CommonModule,
    EmployeeModRoutingModule,
    PrimeNgModule
  ],
  exports: [
    EmployeeModRoutingModule
  ]
})
export class EmployeeModModule { }
