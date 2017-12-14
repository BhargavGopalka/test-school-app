import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private routes: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = sessionStorage.getItem('Authorization');
    const checkToken = token ? atob(token) : null;

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
