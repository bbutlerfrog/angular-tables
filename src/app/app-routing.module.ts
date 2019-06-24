import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { SimpleComponent } from './simple/simple.component';
import { InterestingComponent } from './interesting/interesting.component';
import { ExpandEmployeeTableComponent } from './expand-employee-table/expand-employee-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'simple', component: SimpleComponent },
  { path: 'interesting', component: InterestingComponent },
  { path: 'expanding', component: ExpandEmployeeTableComponent },
  { path: '**', redirectTo: '/' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
