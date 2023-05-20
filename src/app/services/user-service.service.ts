import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ILogin } from '../interfaces/i-login';
import { ILoginResponse } from '../interfaces/i-login-response';
import { IUser } from '../interfaces/i-user';
import { IUserResponse } from '../interfaces/i-user-response';
import { IFriend } from '../interfaces/i-friend';
import { IStatistics } from '../interfaces/i-statistics';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  // Get user token from server
  getToken(userLogin: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>('https://localhost:7203/api/auth', userLogin)
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
      .post<IUser>('https://localhost:7203/api/user', userData)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  // Get user from server.
  getUser(
    id: number/*,
    typeToken: string,
    token: string*/
  ): Observable<IUserResponse> {
    return this.http
      .get<IUserResponse>(`https://localhost:7203/api/User/${id}`)
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  // Get user statistics.
  GetUserStatistics(userId: number): Observable<IStatistics>{
    return this.http.get<IStatistics>(`https://localhost:7203/api/User/GetUserStatistics?userId=${userId}`);
  }
}
