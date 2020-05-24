import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {

        if (this.loginService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['login'], {
            queryParams: {
                'redirectURL' : state.url
            }
        });
        
        return false;
    }

}
