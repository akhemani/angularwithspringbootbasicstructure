import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdminService } from './services/admin.service';
import { LoginComponent } from './login/login.component';
import { PrimeNgModule } from './prime-ng.module';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth-guard.service';
import { EmployeeModModule } from './employee-mod/employee-mod.module';
import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { DepartmentModule } from './department-mod/department.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AdminComponent,
    UserComponent,
    PagenotfoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    DepartmentModule,
    EmployeeModModule,
    AppRoutingModule,    
    HttpClientModule,
    PrimeNgModule
  ],
  providers: [
    AdminService,
    LoginService,
    AuthGuard,
    EmployeeService,
    DepartmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
