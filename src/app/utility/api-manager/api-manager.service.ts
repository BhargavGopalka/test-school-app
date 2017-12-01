import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API} from '../constants/constants';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient) {
  }

  postPublicAPI(endpoint: string, formValue, queryParams?, searchParams?): Observable<any> {
    return this.http.post<any>(API.baseURL + endpoint, formValue, {headers: this.httpOptions})
      .pipe(
        tap((response: any) => {
          console.log(response);
        }),
        catchError(this.onCatch)
      );
  }

  /* Header Option */
  get httpOptions(): HttpHeaders {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' +
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTY4NzBmN2JkZTM2ZjNlZmZhNTkxYWQiLCJuY' +
    'W1lIjoiTmlyYXYiLCJlbWFpbCI6Im1hamV0aGl5YS5uaXJhdjIwMTBAZ21haWwuY29tIiwicm9sZSI6InVzZXI' +
    'iLCJpYXQiOjE1MDA0NTgyMzUsImV4cCI6MTUwMDQ2NTQzNX0.BfRTh5aLnRXLga0AL6NIBYkxIhkf-YLNteqt4KVdSnw'});
    return headers;
  }

  /* Catch an Error */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
}


