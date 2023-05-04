import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/i-post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFriend } from '../interfaces/i-friend';
import { IMessage } from '../interfaces/i-message';

@Injectable({
  providedIn: 'root'
})
export class SocialServiceService {

  constructor(private http: HttpClient) { }

  GetSearchFriendsList(userId: number, searchParam: string): Observable<IFriend[]>{
    return this.http.get<IFriend[]>(`https://localhost:7203/api/Social/friends/getSearchFriendsList?userId=${userId}&searchParam=${searchParam}`)
  }

  getFriends(userId: number): Observable<IFriend[]>{
    return this.http.get<IFriend[]>(`https://localhost:7203/api/Social/friends/getFriendsList?userId=${userId}`)
  }

  getFriendsWithMessagesList(userId: number): Observable<IFriend[]>{
    return this.http.get<IFriend[]>(`https://localhost:7203/api/Social/friends/getFriendsWithMessagesList?userId=${userId}`)
  }

  getMessagesList(senderId: number, receiverId: number): Observable<IMessage[]>{
    return this.http.get<IMessage[]>(`https://localhost:7203/api/Social/messages/getMessagesList?userId=${senderId}&friendUserId=${receiverId}`)
  }

  createFriendInvitation(userId: number, friendUserId: number): Observable<IFriend>{
    return this.http.post<IFriend>(`https://localhost:7203/api/Social/friends/createFriendInvitation?userId=${userId}&friendUserId=${friendUserId}`, null)
  }

  acceptInvitation(userId: number, friendUserId: number): Observable<IFriend>{
    return this.http.post<IFriend>(`https://localhost:7203/api/Social/friends/acceptFriendship?userId=${userId}&friendUserId=${friendUserId}`, null)
  }

  getPosts(forFriend: boolean, userId: number): Observable<IPost[]>{
    return this.http.get<IPost[]>(`https://localhost:7203/api/Social/posts/getPostsList?forFriends=${forFriend}&userId=${userId}`)
  }

  createPost(post: IPost): Observable<IPost[]>{
    return this.http.post<IPost[]>(`https://localhost:7203/api/Social/posts/createPost`, post);
  }
}
