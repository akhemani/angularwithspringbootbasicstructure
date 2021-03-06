import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentHomeComponent } from './department-home/department-home.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { AuthGuard } from '../services/auth-guard.service';


const routes: Routes = [
  {path: 'department', canActivate: [AuthGuard], component: DepartmentHomeComponent, children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: DepartmentListComponent},
    {path: 'add', component: DepartmentAddComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
