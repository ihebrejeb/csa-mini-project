import { Issue } from './../models/Issue';
import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import {IssueService} from '../shared/issue.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  constructor(private service: IssueService) {
  }
  @Input() issue: Issue;
  date: string;
  onEvent(event){
    event.stopPropagation();
    const i = this.issue;
    i.isFinished = !i.isFinished;
    this.service.putIssue(i).subscribe(
      (data: Issue) => this.issue = data
    );
  }
  ngOnInit(): void {
    this.date = moment(this.issue.createdAt).format('MMMM Do YYYY, h:mm a');
  }

}
