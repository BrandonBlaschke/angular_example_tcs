import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
import {Person} from '../services/Person'; 
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public people: Person[] = []; 

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getPeople(); 
  }

  getPeople(): void {
    this.apiService.getPeople().
    subscribe(people => {
      this.people = people;
      console.log(this.people); 
    });
  }

  search(): void {

    let email = (<HTMLInputElement>document.getElementById("Email")).value;
    let name = (<HTMLInputElement>document.getElementById("Name")).value;
    let phone = (<HTMLInputElement>document.getElementById("Phone")).value;
    let country = (<HTMLInputElement>document.getElementById("Country")).value;
    let state = (<HTMLInputElement>document.getElementById("State")).value;
    let city = (<HTMLInputElement>document.getElementById("City")).value;    

    this.apiService.searchPeople(name, email, phone, city, state, country).
    subscribe(result => {
      this.people = result;  
    })
  }

  clearer(): void {
    (<HTMLInputElement>document.getElementById("Email")).value = '';
    (<HTMLInputElement>document.getElementById("Name")).value = '';
    (<HTMLInputElement>document.getElementById("Phone")).value = '';
    (<HTMLInputElement>document.getElementById("Country")).value = '';
    (<HTMLInputElement>document.getElementById("State")).value = '';
    (<HTMLInputElement>document.getElementById("City")).value = '';
  }

}
