import { IssueService } from './../shared/issue.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues:Issue[];
  constructor(private service: IssueService) {
   }

  ngOnInit(): void {
    this.service.getIssues().subscribe(
      (data: Issue[]) => this.issues = data
    );
  }

}
