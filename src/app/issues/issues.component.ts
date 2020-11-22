import { IssueService } from './../shared/issue.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues: Issue[];
  constructor(private service: IssueService) {
   }
  page: number;

  next(){
    this.page += 1;
    this.service.getIssues(this.page + 1).subscribe(
      (data: Issue[]) => {
        if (data.length === 0){
          this.page = 0;
          this.service.getIssues(0).subscribe(
            (d: Issue[]) => this.issues = d
          );
        }else {
          this.issues = data;
        }
      }
    );

  }
  ngOnInit(): void {
    this.page = 0;
    this.service.getIssues(this.page).subscribe(
      (data: Issue[]) => this.issues = data
    );
  }

}
