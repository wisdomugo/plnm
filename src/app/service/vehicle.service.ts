import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUri: string = 'http://localhost:3000/vehicle';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  registerVehicle(data): Observable<any>{
    console.log(data);
    const url = `${this.baseUri}/register`;
    return this.http.post(url, data);
  }

}
