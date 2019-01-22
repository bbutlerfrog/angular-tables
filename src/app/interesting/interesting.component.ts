import { Component  } from '@angular/core';
import { HighlightResult } from 'ngx-highlightjs';

@Component({
  selector: 'app-interesting',
  templateUrl: './interesting.component.html',
  styleUrls: ['./interesting.component.css', '../app.component.css']
})
export class InterestingComponent {

  response: HighlightResult;

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
