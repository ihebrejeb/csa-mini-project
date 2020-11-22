import { Issue } from './../models/Issue';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IssueService {
  url = 'http://localhost:3000/issues/';

  constructor(private http: HttpClient) { }

  
  getIssues() {
    return this.http.get<Issue[]>(this.url);
  }

  deleteIssue(id:string) {
    return this.http.delete(this.url + id);
  }

  addEmploye(e: Issue) {
    return this.http.post(this.url, e);
  }

  searchIssue(id:string) {
    return this.http.get(this.url + id);
  }

  putIssue(e: Issue) {
    return this.http.put(this.url, e);
  }
}
