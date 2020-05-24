import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Request } from '@angular/common/http/http';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}

@Injectable()
export class AdminService {

    private url: string = 'http://127.0.0.1:8080/admin';    

    constructor(
        private http: HttpClient
    ) { }

    getAdmin(): Observable<any> {

        let header = new Headers();
        header.append('Access-Control-Allow-Origin','*');

        // const headers = new Headers();
        // headers.set('authentication', 'auth ticket');
        // const options = new RequestOptions({ headers: headers });

        return this.http.get<any>(this.url, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

}