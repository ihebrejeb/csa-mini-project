import { Component, OnInit } from '@angular/core';
import {Issue} from '../models/Issue';
import {IssueService} from '../shared/issue.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {
  id: string;
  private sub: any;
  issue: Issue;
  date: string;
  constructor(private service: IssueService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.service.searchIssue(this.id).subscribe(
        (data: Issue) => {
          this.issue = data;
          this.date = moment(data.createdAt).format('MMMM Do YYYY, h:mm a');
        }

    );
    });
  }

}
