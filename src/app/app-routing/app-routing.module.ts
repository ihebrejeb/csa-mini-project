import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from '../issues/issues.component';
import {IssueDetailsComponent} from '../issue-details/issue-details.component';

const routes: Routes = [
  {
    path: 'issues/:id',
    component: IssueDetailsComponent,
    data: { animation: 'isRight'}
  },
  {
    path: '',
    component: IssuesComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
