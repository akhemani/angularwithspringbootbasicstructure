import { Injectable } from "@angular/core";
import { LoginDetails } from '../models/login.model';
import { MenuService } from './menu.service';

@Injectable()
export class LoginService {

    constructor(
        private menuService: MenuService
    ) { }

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

        if (data === 3) {
            this.menuService.setMenuItemList([1,2,3,5,6]);
        }

    }

    isLoggedIn(): boolean {
        return localStorage.getItem('type') === null ? false : true;
    }
}
