import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent }  from './app.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import {
  MatToolbarModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Tables } from './tables.group/tables.group.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';


@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    Tables,
    DepartmentTableComponent,
    EmployeeTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    FontAwesomeModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
