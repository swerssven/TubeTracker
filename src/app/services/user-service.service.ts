import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, retry } from 'rxjs';
import { ILogin } from '../models/i-login';
import { ILoginResponse } from '../models/i-login-response';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getToken(userLogin: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('https://localhost:7203/api/Auth', userLogin).pipe(
      retry(3),
      map((resp) => {
        return resp;
      })
    );
  }
}
