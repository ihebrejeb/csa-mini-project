import { Component, OnInit } from '@angular/core';
import {Issue} from '../models/Issue';
import {IssueService} from '../shared/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-update-issue-form',
  templateUrl: './update-issue-form.component.html',
  styleUrls: ['./update-issue-form.component.css']
})
export class UpdateIssueFormComponent implements OnInit {

  constructor(private service: IssueService, private route: ActivatedRoute, private router: Router) { }
  issue: Issue;
  id: string;
  private sub: any;
  date: string;
  test: any;
  onFileChanged(event: any){
    const file = event.target.files[0];
    if (file){
      this.toBase64(file).then((data) => this.issue.imageUrl = data);
    }
    else { this.issue.imageUrl = null; }
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
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

  onSubmit() {
    this.service.putIssue(this.issue).subscribe(() => this.router.navigate(['/']));
  }
}
