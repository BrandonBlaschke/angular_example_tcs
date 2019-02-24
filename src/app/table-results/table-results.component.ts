import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../services/Person';
import { ApiService } from '../services/api.service'; 

@Component({
  selector: 'app-table-results',
  templateUrl: './table-results.component.html',
  styleUrls: ['./table-results.component.css']
})
export class TableResultsComponent implements OnInit {

  @Input()
  public people: Person[] = [];

  constructor(private service: ApiService) { }

  ngOnInit() {
    // console.log(this.people);
  }

  deletePerson(id:string) {
    this.service.deletePerson(id).subscribe(res => {
      var index = 0;  
      for (let i in this.people) {
        if (this.people[i].Id === +id) {
          index = +i; 
          break; 
        }
      }
      this.people.  splice(index, 1);
    })
  }

}
