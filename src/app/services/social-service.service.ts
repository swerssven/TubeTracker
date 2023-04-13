import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/i-post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFriend } from '../interfaces/i-friend';

@Injectable({
  providedIn: 'root'
})
export class SocialServiceService {

  constructor(private http: HttpClient) { }

  GetSearchFriendsList(userId: number, searchParam: string): Observable<IFriend[]>{
    return this.http.get<IFriend[]>(`https://localhost:7203/api/Social/getSearchFriendsList?userId=${userId}&searchParam=${searchParam}`)
  }

  getFriends(userId: number): Observable<IFriend[]>{
    return this.http.get<IFriend[]>(`https://localhost:7203/api/Social/getFriendsList?userId=${userId}`)
  }

  createFriendInvitation(userId: number, friendUserId: number): Observable<IFriend>{
    return this.http.post<IFriend>(`https://localhost:7203/api/Social/createFriendInvitation?userId=${userId}&friendUserId=${friendUserId}`, null)
  }

  acceptInvitation(userId: number, friendUserId: number): Observable<IFriend>{
    return this.http.post<IFriend>(`https://localhost:7203/api/Social/acceptFriendship?userId=${userId}&friendUserId=${friendUserId}`, null)
  }

  getPosts(forFriend: boolean, userId: number): Observable<IPost[]>{
    return this.http.get<IPost[]>(`https://localhost:7203/api/Social/getPostsList?forFriends=${forFriend}&userId=${userId}`)
  }

  createPost(post: IPost): Observable<IPost[]>{
    return this.http.post<IPost[]>(`https://localhost:7203/api/Social/createPost`, post);
  }
}
