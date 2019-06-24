import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { AppRoutingModule } from './app-routing.module';
import { IntroComponent } from './intro/intro.component';
import { SimpleComponent } from './simple/simple.component';
import { InterestingComponent } from './interesting/interesting.component';
import { ExpandEmployeeTableComponent } from './expand-employee-table/expand-employee-table.component';

export const APP_ID = 'angulartables';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentTableComponent,
    EmployeeTableComponent,
    IntroComponent,
    SimpleComponent,
    InterestingComponent,
    ExpandEmployeeTableComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'angulartables'}),
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
    MatTableModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,

  ],
  providers: [],
})
export class AppModule { }
