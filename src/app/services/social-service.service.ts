import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/i-post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFriend } from '../interfaces/i-friend';
import { IMessage, IMessageDto } from '../interfaces/i-message';
import { IComment } from '../interfaces/i-comment';

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

  createMessage(message: IMessage): Observable<IMessageDto>{
    return this.http.post<IMessageDto>(`https://localhost:7203/api/Social/messages/createMessage`, message)
  }

  getMessagesList(senderId: number, receiverId: number): Observable<IMessageDto>{
    return this.http.get<IMessageDto>(`https://localhost:7203/api/Social/messages/getMessagesList?userId=${senderId}&friendUserId=${receiverId}`)
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

  createPostComment(comment: IComment): Observable<IComment[]>{
    return this.http.post<IComment[]>(`https://localhost:7203/api/Social/posts/createPostComment`, comment);
  }

  getCommentsList(postId: number): Observable<IComment[]>{
    return this.http.get<IComment[]>(`https://localhost:7203/api/Social/posts/getCommentsList?postId=${postId}`);
  }

  createPostLike(userId: number, postId: number, liked: boolean): Observable<boolean>{
    return this.http.post<boolean>(`https://localhost:7203/api/Social/posts/createPostLike?userId=${userId}&postId=${postId}&liked=${liked}`, null)
  }
}
