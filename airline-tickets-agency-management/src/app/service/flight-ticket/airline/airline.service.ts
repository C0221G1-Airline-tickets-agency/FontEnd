import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airline} from "../../../model/flight-ticket/airline";

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  public api_url = 'http://localhost:8080/airline/';



  constructor(private http: HttpClient) {
  }

  getAllAirline(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.api_url+'list-airline');
  }

  saveAirline(airline : Airline): Observable<Airline>{
    console.log(airline)
    return this.http.post<Airline>(this.api_url +'create', airline);
  }
}
