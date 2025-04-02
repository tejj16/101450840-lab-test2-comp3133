import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../mission/mission';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}?limit=100`);
  }

  getMissionByFlightNumber(flightNumber: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${flightNumber}`);
  }

  getFilteredMissions(filters: any): Observable<Mission[]> {
    let params = new HttpParams().set('limit', '100');
    
    if (filters.launch_year) {
      params = params.set('launch_year', filters.launch_year);
    }
    
    if (filters.launch_success !== null) {
      params = params.set('launch_success', filters.launch_success.toString());
    }
    
    if (filters.land_success !== null) {
      params = params.set('land_success', filters.land_success.toString());
    }

    return this.http.get<Mission[]>(this.apiUrl, { params });
  }
}