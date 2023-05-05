import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../Service/api.service';
import { UserType } from '../Models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private service:ApiService)
  {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | 
    UrlTree {
      if(this.service.isLoggedIn())
      {
        if(this.service.getTokenUserInfo()?.userType === UserType.ADMIN)
        {
          return true;
        }
        return false;
      }


    return false;
  }
  
}
