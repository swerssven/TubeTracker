import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/i-post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialServiceService {

  constructor(private http: HttpClient) { }

  createPost(post: IPost): Observable<IPost[]>{
    return this.http.post<IPost[]>(`https://localhost:7203/api/Social/createPost`, post);
  }
}
