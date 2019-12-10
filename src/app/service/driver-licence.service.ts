import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriverLicenceService {

  baseUri: string = 'http://localhost:3000/driver';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  saveDriverLicence(data): Observable<any>{
    const url = `${this.baseUri}/save-licence`;
    return this.http.post(url, data);
  }

    // Get all Driver Licences
    getDriverLicences() {
      return this.http.get(`${this.baseUri}`);
    }
  
    // Get a driver licence
    getDriverLicence(id): Observable<any> {
      let url = `${this.baseUri}/read/${id}`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  
     // Error handling 
     errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
    
}
