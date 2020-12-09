import {Component, EventEmitter, OnInit, Output} from '@angular/core';
interface Search {
  value: string;
  selectedValue: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  value: string;
  selectedValue: string;
  @Output() filterEvent = new EventEmitter<Search>();

  constructor() {
  }

  ngOnInit(): void {
    this.value = '';
    this.selectedValue = 'all';
  }

  filter() {
    this.filterEvent.emit({value: this.value, selectedValue: this.selectedValue});
  }

  clear() {
    this.value = '';
    this.filter();
  }
}
