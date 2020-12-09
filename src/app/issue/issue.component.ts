import { Issue } from './../models/Issue';
import * as moment from 'moment';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssueService} from '../shared/issue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Output() deleteIssueEvent = new EventEmitter<Issue>();

  constructor(private service: IssueService, private router: Router) {
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

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.service.deleteIssue(this.issue.id).subscribe(
      () => {
        this.deleteIssueEvent.emit(this.issue);
      }
    );
  }

  onUpdate(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/issues/update/' + this.issue.id]);
  }
}
