import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class AuthGuardService implements CanActivate {

    constructor(private authservice : AuthService,private router : Router){}

    canActivate(route : ActivatedRouteSnapshot, router : RouterStateSnapshot) : 
    boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
    {
        return this.authservice.user.pipe(
            take(1), 
            map(user => {
            const userActive = !!user ;
            if(userActive){
                return true ;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}