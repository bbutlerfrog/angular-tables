import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

import {
  MatToolbarModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent }  from './app.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { Tables } from './tables.group/tables.group.component';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import { HighlightModule } from 'ngx-highlightjs';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'php', func: php},
    {name: 'javascript', func: javascript }
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    Tables,
    DepartmentTableComponent,
    EmployeeTableComponent,
    TitleBarComponent
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
    MatTableModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HighlightModule.forRoot({ languages: hljsLanguages })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
