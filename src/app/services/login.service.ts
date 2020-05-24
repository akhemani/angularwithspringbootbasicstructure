import { Injectable } from "@angular/core";
import { LoginDetails } from '../models/login.model';

@Injectable()
export class LoginService {
    login(loginDetails: LoginDetails): boolean {

        if (
            (loginDetails.username === 'admin' && loginDetails.password === 'admin' && loginDetails.type === 1) ||
            (loginDetails.username === 'user' && loginDetails.password === 'user' && loginDetails.type === 2) ||
            (loginDetails.username === 'employee' && loginDetails.password === 'employee' && loginDetails.type === 3) ) {
                this.setData(loginDetails.type);
                return true;
        }
        return false;
    }

    setData(data) {
        localStorage.setItem('type', data);
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('type') === null ? false : true;
    }
}
