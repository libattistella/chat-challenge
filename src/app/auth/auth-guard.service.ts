import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authSvc: AuthService) { }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.authSvc.isLoggedIn();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.authSvc.isLoggedIn();
  }
}
