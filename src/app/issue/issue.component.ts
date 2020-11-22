import { Issue } from './../models/Issue';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  

  @Input() issue:Issue
  ngOnInit(): void {
  }

}
