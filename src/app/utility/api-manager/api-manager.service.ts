import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API} from '../constants/constants';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {Token} from '../tokens/tokens';
import 'rxjs/add/observable/throw';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ApiManagerService {

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  /* APIs */
  putAPI(endpoint: string, formValue, files?): Observable<any> {
    if (!files) {
      return this.http.put<any>(API.baseURL + endpoint, formValue, {headers: this.httpOptions})
        .pipe(
          tap((response) => {
            this.showToastr(response, true);
          }),
          catchError(this.onCatch)
        );
    } else {
      const singleFile: File = files[0];
      const formData: FormData = new FormData();
      formData.append('image', singleFile, singleFile.name);
      if (formValue !== '' && formValue !== undefined && formValue !== null) {
        for (const property in formValue) {
          if (formValue.hasOwnProperty(property)) {
            formData.append(property, formValue[property]);
          }
        }
      }
      return this.http.put<any>(API.baseURL + endpoint, formData, {headers: this.httpOptions})
        .pipe(
          tap((response) => {
            this.showToastr(response, true);
          }),
          catchError(this.onCatch)
        );
    }
  }

  deleteAPI(endpoint: string): Observable<any> {
    return this.http.delete<any>(API.baseURL + endpoint, {headers: this.httpOptions})
      .pipe(
        tap((response) => {
          this.showToastr(response, true);
        }),
        catchError(this.onCatch)
      );
  }

  getAPI(endpoint: string, queryParams?, searchParams?): Observable<any> {
    queryParams ? queryParams : (queryParams = {});
    (searchParams) ? (queryParams['search'] = JSON.stringify(searchParams)) : '';
    let params = new HttpParams();
    // const params = new URLSearchParams();          /* Angular 4 way */
    for (const key in queryParams) {
      params = params.set(key, queryParams[key]);
      // params.set(key, queryParams[key]);           /* Angular 4 way */
      // params = params.append(key.toString(), queryParams[key].toString());
      /* ^you can use something like this as well in Angular5, but in this one you don't need to put .toString() part inside get API */
    }

    return this.http.get<any>(API.baseURL + endpoint + '?' + params.toString(),
      {headers: this.httpOptions})
      .pipe(
        tap((response: any) => {
          this.showToastr(response, false);
        }),
        catchError(this.onCatch)
      );
  }

  postAPI(endpoint: string, formValue, files?): Observable<any> {
    const formData: FormData = new FormData();
    if (formValue !== '' && formValue !== undefined && formValue !== null) {
      for (const property in formValue) {
        if (formValue.hasOwnProperty(property)) {
          formData.append(property, formValue[property]);
        }
      }
    }

    if (!files) {
      return this.http.post<any>(API.baseURL + endpoint, formData, {headers: this.httpOptions})
        .pipe(
          tap((response: any) => {
            this.showToastr(response, true);
          }),
          catchError(this.onCatch)
        );
    } else {
      const singleFile: File = files[0];
      formData.append('image', singleFile, singleFile.name);
      return this.http.post<any>(API.baseURL + endpoint, formData, {headers: this.httpOptions})
        .pipe(
          tap((response: any) => {
            this.showToastr(response, true);
          }),
          catchError(this.onCatch)
        );
    }
  }

  /* Headers */
  get httpOptions(): HttpHeaders {
    const Authorization = sessionStorage.getItem('Authorization');
    const token = (Authorization ? Authorization : Token.STATIC_TOKEN);
    const headers = new HttpHeaders({'Authorization': `Bearer ` + token});
    return headers;
  }

  /* Toastr Sucess Message */
  showToastr(response, show: Boolean) {
    const toastrMessage = response.message;

    if (toastrMessage && show) {
      this.toastr.success(toastrMessage);
    }
  }

  /* Catch an Error */
  private onCatch(error: Response): Observable<any> {
    return Observable.throw(error);
  }
}
