import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { Department } from '../models/department.model';

@Injectable()
export class DepartmentService {

    url: string = 'http://localhost:8080/api/department';

    constructor(
        private http: HttpClient
    ) {}

    getAllDepartments(): Observable<Page<Department>> {
        return this.http.get<Page<Department>>(this.url);
    }

    getDepartmentById(id): Observable<Department> {
        return this.http.get<Department>(this.url + '/byId/' + id);
    }

}