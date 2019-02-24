import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  HttpHeaders
} from '@angular/common/http';
import {
  catchError
} from 'rxjs/operators';

import {
  Observable,
  of
} from 'rxjs';


import {
  Person
} from './Person';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

let heads = new HttpHeaders();
heads.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://localhost:57946/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable < Person[] > {
    return this.http.get < Person[] > (this.apiURL + '/Person')
      .pipe(
        catchError(this.handleError('getPeople', []))
      );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiURL + '/Person/add', JSON.stringify(person), httpOptions)
    .pipe(
      catchError(this.handleError('getPeople', null))
    )
  }

  searchPeople(name:string, email:string, phone:string, city:string, state:string, country:string) {
    return this.http.get<Person[]>(this.apiURL + '/search?name=' + name + '&email=' + email + 
    '&phone=' + phone + '&city=' + city + '&state=' + state + '&country=' + country)
    .pipe(
      catchError(this.handleError('getPeople', null))
    )
  }

  getPerson(id: string): Observable < Person > {
    return this.http.get < Person > (this.apiURL + '/Person/' + id)
      .pipe(
        catchError(this.handleError('getPeople', null))
      );
  }

  deletePerson(id: string) {
    return this.http.delete(this.apiURL + '/Person/' + id).
    pipe(
      catchError(this.handleError('getPeople', null))
    );
  }

  updatePerson(person: Person) {
    console.log(JSON.stringify(person)); 
    this.http.put<Person>(this.apiURL + "/Person/update", JSON.stringify(person), httpOptions)
      .pipe(
        catchError(this.handleError('getPeople', null))
      );
  }

  private handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {
      console.error(error);
      return of(result as T);
    }
  }
}
