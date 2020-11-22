import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Issue} from '../models/Issue';
import {IssueService} from '../shared/issue.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  issueForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });
  image: unknown ;
  onFileChanged(event: any){
    const file = event.target.files[0];
    if (file){
      this.toBase64(file).then((data) => this.image = data);
    }
    else { this.image = null; }
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
  onSubmit() {
   const issue: Issue = new Issue();
   issue.title = this.issueForm.value.title;
   issue.description = this.issueForm.value.title;
   issue.imageUrl = this.image;
   issue.createdAt = new Date();
   issue.name = 'Iheb Rejeb';
   issue.isFinished = false;
   issue.priority = 'high';
   this.service.addIssue(issue).subscribe(
      (data: Issue) => console.warn(data)
    );
  }
  constructor(private service: IssueService) { }

  ngOnInit(): void {
  }

}
