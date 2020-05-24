import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeHomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'employeeList'},
      {path: 'employeeList', component: EmployeeListComponent},
      {path: 'addEmployee', component: EmployeeAddComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeModRoutingModule { }
