import { IssueService } from '../shared/issue.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  filteredIssues: Issue[];
  issues: Issue[];
  constructor(private service: IssueService) {
   }

  ngOnInit(): void {
    this.service.getIssues().subscribe(
      (data: Issue[]) => {
        this.issues = data;
        this.filteredIssues = data;
      }
    );
  }

  deleteIssue($event: Issue) {
    this.issues = this.issues.filter(i => i.id !== $event.id);
    this.filteredIssues = this.filteredIssues.filter(i => i.id !== $event.id);

  }

  filterData($event: any) {
    if ($event.selectedValue === 'all') {
      this.filteredIssues = this.issues.filter(issue => issue.title.includes($event.value));
    }
    else if ($event.selectedValue === 'finished') {
      this.filteredIssues = this.issues.filter(issue => issue.title.includes($event.value) && issue.isFinished);
    }
    else if ($event.selectedValue === 'unfinished') {
      this.filteredIssues = this.issues.filter(issue => issue.title.includes($event.value) && !issue.isFinished);
    }
  }
}
