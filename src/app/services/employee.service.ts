import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Page } from '../models/page.model';

@Injectable()
export class EmployeeService {

    url: string = 'http://localhost:8080/api/employee';

    constructor(
        private http: HttpClient
    ) { }

    getAllEmployess(): Observable<Page<Employee>> {
        return this.http.get<Page<Employee>>(this.url);
    }

    getEmployeeById(id): Observable<Employee> {
        return this.http.get<Employee>(this.url + '/byId/' + id);
    }

    saveEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.url, employee);
    }

    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(this.url, employee);
    }

    deleteEmployee(id) : Observable<Employee> {
        return this.http.delete<any>(this.url + '/byId/' + id);
    }

    searchEmployee(searchedText) : Observable<Page<Employee>> {
        return this.http.get<Page<Employee>>(this.url + '/search/' + searchedText);
    }

    filterEmployees(employee: Employee) : Observable<Page<Employee>> {
        return this.http.post<Page<Employee>>(this.url + '/filterEmployees', employee);
    }
}
