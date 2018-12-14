import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { EmployeesService } from '../employees.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  providers: [EmployeesService]
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = ['emp_no', 'first_name', 'last_name', 'birth_date', 'hire_date'];
  resultsLength = 0;
  isLoadingResults = true;
  employeesService: EmployeesService | null;
  data: Employee[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.sort.direction = 'asc';
    this.sort.active = 'emp_no';
    this.sort.sortChange.subscribe();
    this.employeesService = new EmployeesService(this.http);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page,  )



  }

}
