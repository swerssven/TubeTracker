import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ILogin } from '../interfaces/i-login';
import { ILoginResponse } from '../interfaces/i-login-response';
import { IUser } from '../interfaces/i-user';
import { IUserResponse } from '../interfaces/i-user-response';
import { IFriend } from '../interfaces/i-friend';
import { IStatistics } from '../interfaces/i-statistics';
import { IUserGrid } from '../interfaces/i-user-grid';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  apiUrl!: string;
  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  // Get user token from server
  getToken(userLogin: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.apiUrl}/api/auth`, userLogin)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        map((resp) => {
          return resp;
        })
      );
  }

  // Send user data to server to register user in DB.
  createUser(userData: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.apiUrl}/api/User/CreateUser`, userData)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  // Get user from server.
  getUser(
    id: number /*,
    typeToken: string,
    token: string*/
  ): Observable<IUserResponse> {
    return this.http
      .get<IUserResponse>(`${this.apiUrl}/api/User/${id}`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  // Get list of users for the admin.
  GetUserList(): Observable<IUserGrid[]> {
    return this.http.get<IUserGrid[]>(
      `${this.apiUrl}/api/User/GetUserList`
    );
  }

  // Get user statistics.
  GetUserStatistics(userId: number): Observable<IStatistics> {
    return this.http.get<IStatistics>(
      `${this.apiUrl}/api/User/GetUserStatistics?userId=${userId}`
    );
  }

  // Edit user in database.
  EditUser(userData: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      `${this.apiUrl}/api/User/EditUser`,
      userData
    );
  }
}
