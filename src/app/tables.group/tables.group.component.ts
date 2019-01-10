import { Component } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.group.component.html',
  styleUrls: ['./tables.group.component.css']
})
export class Tables  {

  response: HighlightResult;

  code1 = `export interface Department {
  DepartmentName: string;
  DepartmentNumber: string;
}`

  code2 = `import { Department } from './department.model';

export interface DepartmentApi {
    items: Department[];
    total_count: number;
}`

  departmentService = `import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { DepartmentApi } from './shared/department-api.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  DepartmentUrl = 'https://api.benfrog.net/departments';
  
  

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
        'Backend returned code ${ 'error.status' }, ' +
        'body was: ${ 'error.error' } ');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}`

  jsExploding = `function initDeptTable () {
	var table = $('#employee-dept').DataTable({
		"ajax" : {
			"url" : '../main/php/serverHTML.php?type=JSON&content=employee-dept',
	        "cache": false,
            "contentType": "application/json",
    },`
  
  departmentHttp = `return this.http.get<DepartmentApi>(this.DepartmentUrl, {params: httpParams})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }`
  
  departmentTableComponentService = `this.departmentsService = new DepartmentsService(this.http);
     merge(this.sort.sortChange)
      .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.departmentsService!.getDepartments(this.sort.direction, this.sort.active)
          }),
          map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;
          return data.items;
        })).subscribe(data =>this.data = data);`
          
  employeesMaterialExampleFilter = `<mat-form-field>
  <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
</mat-form-field>` 

  employeeTableHMTLFilter = `<mat-form-field>

    <input matInput placeholder="Search" #input>

  </mat-form-field>`

  employeeTableComponentFilter = `fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),`
   
  employeeServiceGetEmployees = `getEmployees(sortDirection: string, sortParameter: string, filter: string, start: number, end: number): Observable<EmployeeApi> {
        sortDirection = sortDirection.trim();
        sortParameter = sortParameter.trim();
        filter = filter.trim();

        //toString is necessary here because httpClient does not support anything but strings 
        let httpParams = new HttpParams({
          fromObject: {
              sortDirection: sortDirection, sortParameter: sortParameter, filter: filter,
              start: start.toString(), end: end.toString()
          }
        });`

  employeeTableHTMLPaginator = `<mat-paginator [length]="resultsLength" [pageSize]="10" [pageSizeOptions]="[10, 20, 50]"></mat-paginator>`

  employeeTablePaginatorChange = ` this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sort.direction = 'asc';
    this.sort.active = 'emp_no';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
    this.input.nativeElement.value = '';
    
    this.sort.sortChange.subscribe();
    this.employeeService = new EmployeeService(this.http);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.employeeService!.getEmployees(
              this.sort.direction,
              this.sort.active,
              this.input.nativeElement.value,
              this.paginator.pageIndex,
              this.paginator.pageSize)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;
          return data.items;
        }),
      ).subscribe(data => this.data = data);
  }`;

  onHighlight(e) {
    this.response = {
      language: e.language,
      r: e.r,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }
}
