import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { Designation } from '../models/designation.model';

@Injectable()
export class DesignationService {

    url: string = 'http://localhost:8080/api/designation';

    constructor(
        private http: HttpClient
    ) { }

    getAllDesignations() : Observable<Page<Designation>> {
        return this.http.get<Page<Designation>>(this.url);
    }

}