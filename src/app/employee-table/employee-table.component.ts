import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { EmployeeService } from '../employee.service';
import { Employee } from '../shared/employee.model';



@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  providers: [EmployeeService]
})
export class EmployeeTableComponent implements OnInit {

  displayedColumns: string[] = ['emp_no', 'first_name', 'last_name', 'birth_date', 'hire_date'];
  resultsLength= 0;
  isLoadingResults = true;
  employeeService: EmployeeService | null;
  data: Employee[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(private http: HttpClient) { }
  

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
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
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
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
  }
}
