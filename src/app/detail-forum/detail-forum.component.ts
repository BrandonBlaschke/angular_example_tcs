import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../services/api.service';
import { switchMap } from 'rxjs/operators';
import { Person } from '../services/Person';

@Component({
  selector: 'app-detail-forum',
  templateUrl: './detail-forum.component.html',
  styleUrls: ['./detail-forum.component.css']
})

export class DetailForumComponent implements OnInit {

  public person: any = {FirstName: null, LastName: null, Email: null, Phone: null,
  CountryId: null, StateId: null, CityId: null, Id: 0};
  public id: string; 
  public submitButton:string; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == "0") {
        this.submitButton = "Add Person";
      } else {
        this.service.getPerson(params['id']).subscribe(person => {
          this.person = person
          this.submitButton = "Submit"; 
        }) 
      }
    });
  }

  updateThisPerson() {

    let person = 
    {Id: +this.id, 
      FirstName: (<HTMLInputElement>document.getElementById("FirstName")).value, 
      LastName: (<HTMLInputElement>document.getElementById("LastName")).value, 
      Phone: (<HTMLInputElement>document.getElementById("Phone")).value, 
      Email: (<HTMLInputElement>document.getElementById("Email")).value,
      CountryId: null, 
      StateId: null, 
      CityId: null, 
      Photo: null }; 

    if (this.id === "0") {
      person.Id = null; 
      this.service.addPerson(person).subscribe(res => {
        console.log(res); 
      }); 
    } else {
      this.service.updatePerson(person); 
    }
  }
}
