import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from '../issues/issues.component';
import {IssueDetailsComponent} from '../issue-details/issue-details.component';
import {IssueFormComponent} from '../issue-form/issue-form.component';

const routes: Routes = [
  {
    path: 'issues/add',
    component: IssueFormComponent,
    data: { animation: 'isLeft'}
  },
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
