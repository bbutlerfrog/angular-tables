import {CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Employee } from '../shared/employee.model';
import { EmployeesService } from '../employees.service';


export class EmployeesDataSource implements DataSource<Employee> {

    private employeesSubject = new BehaviorSubject<Employee[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private employeesService: EmployeesService) { }
    
    loadEmployees(sortDirection: string,
      sortParameter: string,
      filter: string,
      start: number,
      end: number) {

        this.loadingSubject.next(true);
        this.employeesService.getEmployees(sortDirection, sortParameter, filter, 
          start, end).pipe(
        
            finalize(() => this.loadingSubject.next(false))
          ).
          subscribe( employees => this.employeesSubject.next(employees));

      }

    connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
      return this.employeesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.employeesSubject.complete();
      this.loadingSubject.complete();
    }
  }
