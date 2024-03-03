import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly moreParams = ['test1', 'test2'];
  readonly defaultImage = 'https://robohash.org';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
    .pipe(
      catchError(this.handleError)     
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`).pipe(
      map(user => {
        return { ...user, isAdmin: true, searchKey: [user.name, user.username] }
      })
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  patchUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }  

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`http://localhost:9000/file/upload`, formData,
    { observe: 'events', reportProgress: true });
  }

  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, { responseType: 'text'});
  }

  downloadFile(): Observable<HttpResponse<Blob>> {
    return this.http.get(`assets/text.txt`, { responseType: 'blob', observe: 'response'});
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/users`)
  //   .pipe(
  //     tap(users => console.log(users)),
  //     map(users => users.map(user => ({
  //         email: user.email,
  //         website: user.website,
  //         phone: user.phone,
  //         image: `${this.defaultImage}/${user.username.toLowerCase()}`,
  //         username: user.username,
  //         name: user.name.toUpperCase(),
  //         isAdmin: user.id === 10? 'admin': 'user',
  //         searchKey: [user.name, user.username]
  //     })))
  //   );
  // }

  
  private handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 404)  return throwError({ code: 404, message: ' Page Not Found or File Not Found error'});
  }

}
