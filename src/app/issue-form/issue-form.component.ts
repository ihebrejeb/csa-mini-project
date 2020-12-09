import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {Issue} from '../models/Issue';
import {IssueService} from '../shared/issue.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css']
})
export class IssueFormComponent implements OnInit {
  constructor(private service: IssueService, private router: Router) { }
  get title() { return this.issueForm.get('title'); }
  get description() { return this.issueForm.get('description'); }
  get image() { return this.issueForm.get('image'); }
  imageUrl: unknown ;
  issueForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  onFileChanged(event: any){
    const file = event.target.files[0];
    if (file){
      this.toBase64(file).then((data) => this.imageUrl = data);
    }
    else { this.imageUrl = null; }
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
    issue.description = this.issueForm.value.description;
    issue.imageUrl = this.imageUrl;
    issue.createdAt = new Date();
    issue.name = 'Iheb Rejeb';
    issue.isFinished = false;
    issue.priority = 'high';
    this.service.addIssue(issue).subscribe(() => {
      this.router.navigate(['/']); });
  }

  ngOnInit(): void {

    this.issueForm = new FormGroup({
      title: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12)
        ]),
      description: new FormControl('',
        [  Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)]
      ),
      image: new FormControl(null,
        [Validators.required])
    });
  }
}
