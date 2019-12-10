import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser;

  baseUri: string = 'http://localhost:3000/auth';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.baseUri}/login`;
    let loginInfo = {email: email, password: password};
    return this.http.post(url, loginInfo, {headers: this.headers})
    .pipe(tap((data) => {
       this.currentUser = data[0];
       console.log(`The Logged in User: ${this.currentUser}`);
      }))
      .pipe(catchError(this.errorMgmt))
  }

  isAuthenticated(){
    return !!this.currentUser;
  }

  checkAuthenticationStatus(){
   return this.isAuthenticated();
  }

  registerUser(userdata): Observable<any> {
    const url = `${this.baseUri}/register`;
    return this.http.post(url, userdata);
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
