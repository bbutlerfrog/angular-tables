import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { EmployeesService } from '../employees.service';
import { Department } from '../shared/department.model';



@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css'],
  providers: [EmployeesService]
})



export class DepartmentTableComponent  implements OnInit{
  displayedColumns: string[] = ['dept_no', 'dept_name'];
  resultsLength= 0;
  isLoadingResults = true;
  employeesService: EmployeesService | null;
  data: Department[] = [];
 

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.sort.direction = 'asc';
    this.sort.active = 'dept_no';
    this.sort.sortChange.subscribe();
    this.employeesService = new EmployeesService(this.http);
     merge(this.sort.sortChange)
      .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.employeesService!.getDepartments(this.sort.direction, this.sort.active)
          }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.total_count;
          return data.items;
        })).subscribe(data =>this.data = data);
  }
}
