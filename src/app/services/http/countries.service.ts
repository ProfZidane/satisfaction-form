import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _jsonsURL = "assets/countries.json";

  constructor(private http: HttpClient) { }

  getJSON(): Observable<any> {
    return this.http.get(this._jsonsURL);
  }

}
