import { Component, OnInit } from '@angular/core';
import { domainMock } from '../domain.mock';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  private searchText;
  private results;
  constructor() { }

  ngOnInit() {
  }

  private search() {
    this.results = [];
    for (let domain in domainMock) {
      if (domain.toLowerCase().search(this.searchText.toLowerCase()) > -1) {
        this.results.push(domain);
      }
    }
  }
}
