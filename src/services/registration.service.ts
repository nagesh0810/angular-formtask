// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { User } from 'src/store/registration.model';



// @Injectable({
//   providedIn: 'root'
// })
// export class RegistrationformServicesService {

// private apiUrl = 'http://localhost:3000/usersData';

//   constructor(private http: HttpClient) { }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.apiUrl);
//   }

//   addUser(user: User): Observable<User> {
//     return this.http.post<User>(this.apiUrl, user);
//   }

//   deleteUser(userId: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${userId}`);
//   }

//   updateUser(user: User): Observable<User> {
//     return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
//   }
//   showUserPassword(id: string): Observable<any> {
//     // TODO: Implement the logic to show a user's password
//     return this.http.get(`${this.apiUrl}/${id}`);
//   }

// }
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/store/registration.model';


@Injectable({
  providedIn: 'root'
})
export class RegistrationformServicesService {

  private apiUrl = 'http://localhost:3000/usersData';

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }
  
  showUserPassword(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

}


