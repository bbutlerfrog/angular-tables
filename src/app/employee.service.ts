import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';

import { EmployeeApi } from './shared/employee-api.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  EmployeesUrl = 'https://api.benfrog.net/employees';
  
    getEmployees(sortDirection: string, sortParameter: string, filter: string, start: number, end: number): Observable<EmployeeApi> {
        sortDirection = sortDirection.trim();
        sortParameter = sortParameter.trim();
        filter = filter.trim();

        //toString is necessary here because httpClient does not support anything but strings 
        let httpParams = new HttpParams({
          fromObject: {
              sortDirection: sortDirection, sortParameter: sortParameter, filter: filter,
              start: start.toString(), end: end.toString()
          }
        });

        return this.http.get<EmployeeApi>(this.EmployeesUrl, { params: httpParams })
        .pipe(
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleError), // then handle the error
      );
    }  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}

