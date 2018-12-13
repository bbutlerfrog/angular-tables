import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { DepartmentApi } from './shared/department-api.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  DepartmentUrl = 'http://localhost:8335/employees';
  
  

  getDepartments(sortDirection: string, sortParameter: string ): Observable<DepartmentApi> {
    sortDirection = sortDirection.trim();
    sortParameter = sortParameter.trim();

    let httpParams = new HttpParams({ fromObject: { sortDirection: sortDirection, sortBy: sortParameter } });

    return this.http.get<DepartmentApi>(this.DepartmentUrl, {params: httpParams})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
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

