import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { merge, fromEvent, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';

import { EmployeesDataSource } from './employee-data-source';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {

  dataSource: EmployeesDataSource;
  displayedColumns: string[] = ['emp_no', 'first_name', 'last_name', 'birth_date', 'hire_date'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.dataSource = new EmployeesDataSource(this.employeesService);
    this.dataSource.loadEmployees('asc', 'emp_no', '', 0, 10);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadEmployeesPage();
        })
      )
      .subscribe();

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadEmployeesPage())
      )
      .subscribe();
  }

  loadEmployeesPage() {
    
    this.dataSource.loadEmployees(
      this.sort.direction,
      this.sort.active,
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize); 


  

  }


}
