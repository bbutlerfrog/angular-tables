import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { DepartmentsService } from '../departments.service';
import { Department } from '../shared/department.model';



@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css'],
  providers: [DepartmentsService]
})



export class DepartmentTableComponent  implements OnInit{
  displayedColumns: string[] = ['dept_no', 'dept_name'];
  resultsLength= 0;
  isLoadingResults = true;
  departmentsService: DepartmentsService | null;
  data: Department[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.sort.direction = 'asc';
    this.sort.active = 'dept_no';
    this.sort.sortChange.subscribe();
    this.departmentsService = new DepartmentsService(this.http);
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
        })).subscribe(data =>this.data = data);
  }
}
