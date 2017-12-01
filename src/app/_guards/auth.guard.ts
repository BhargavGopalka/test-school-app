import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private routes: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const checkToken = sessionStorage.getItem('Authorization');
    if (checkToken && (state.url === '/login' || state.url === '/')) {
      this.routes.navigate(['dashboard']);
      return false;
    }
    if (checkToken && (state.url !== '/' && state.url !== '/login')) {
      return true;
    }
    if (!checkToken && (state.url === '/' || state.url === '/login')) {
      return true;
    }
    this.routes.navigate(['login']);
    return false;
  }

}
