import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Intro } from './intro/intro.component';
import { SimpleComponent } from './simple/simple.component';
import { InterestingComponent } from './interesting/interesting.component';

const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: Intro },
  { path: 'simple', component: SimpleComponent },
  { path: 'interesting', component: InterestingComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
