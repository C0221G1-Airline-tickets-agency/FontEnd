import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../../../model/flight-ticket/location";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private api_url = 'http://localhost:8080/api/flight/get-all-location'

  constructor(private http: HttpClient) { }
  getAllLocation() : Observable<Location[]> {
    return this.http.get<Location[]>(this.api_url)
  }
}
