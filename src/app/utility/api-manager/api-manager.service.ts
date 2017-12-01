import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API} from '../constants/constants';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Token} from '../tokens/tokens';

@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient) {
  }

  getAPI(endpoint: string, queryParams?, searchParams?): Observable<any> {
    return this.http.get<any>(API.baseURL + endpoint, {headers: this.httpOptions})
      .pipe(
        tap((response: any) => {
        }),
        catchError(this.onCatch)
      );
  }

  postAPI(endpoint: string, formValue, queryParams?, searchParams?): Observable<any> {
    return this.http.post<any>(API.baseURL + endpoint, formValue, {headers: this.httpOptions})
      .pipe(
        tap((response: any) => {
        }),
        catchError(this.onCatch)
      );
  }

  /* Headers */
  get httpOptions(): HttpHeaders {
    const Authorization = sessionStorage.getItem('Authorization');
    const token = (Authorization ? Authorization : Token.STATIC_TOKEN);
    const headers = new HttpHeaders({'Authorization': `Bearer ` + token});
    return headers;
  }

  /* Catch an Error */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
}


