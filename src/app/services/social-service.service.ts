import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/i-post';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval, take } from 'rxjs';
import { IFriend } from '../interfaces/i-friend';
import { IMessage, IMessageDto } from '../interfaces/i-message';
import { IComment } from '../interfaces/i-comment';
import { DataServiceService } from './data-service.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocialServiceService {
  private subscriptions: Subscription = new Subscription();
  apiUrl!: string;

  constructor(private http: HttpClient, private dataService: DataServiceService) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  GetSearchFriendsList(
    userId: number,
    searchParam: string
  ): Observable<IFriend[]> {
    return this.http.get<IFriend[]>(
      `${this.apiUrl}/api/Social/friends/getSearchFriendsList?userId=${userId}&searchParam=${searchParam}`
    );
  }

  getFriends(userId: number): Observable<IFriend[]> {
    return this.http.get<IFriend[]>(
      `${this.apiUrl}/api/Social/friends/getFriendsList?userId=${userId}`
    );
  }

  getFriendsWithMessagesList(userId: number): Observable<IFriend[]> {
    return this.http.get<IFriend[]>(
      `${this.apiUrl}/api/Social/friends/getFriendsWithMessagesList?userId=${userId}`
    );
  }

  createMessage(message: IMessage): Observable<IMessageDto> {
    return this.http.post<IMessageDto>(
      `${this.apiUrl}/api/Social/messages/createMessage`,
      message
    );
  }

  getMessagesList(
    senderId: number,
    receiverId: number
  ): Observable<IMessageDto> {
    return this.http.get<IMessageDto>(
      `${this.apiUrl}/api/Social/messages/getMessagesList?userId=${senderId}&friendUserId=${receiverId}`
    );
  }

  createFriendInvitation(
    userId: number,
    friendUserId: number
  ): Observable<IFriend> {
    return this.http.post<IFriend>(
      `${this.apiUrl}/api/Social/friends/createFriendInvitation?userId=${userId}&friendUserId=${friendUserId}`,
      null
    );
  }

  acceptInvitation(userId: number, friendUserId: number): Observable<IFriend> {
    return this.http.post<IFriend>(
      `${this.apiUrl}/api/Social/friends/acceptFriendship?userId=${userId}&friendUserId=${friendUserId}`,
      null
    );
  }

  getPosts(forFriend: boolean, userId: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(
      `${this.apiUrl}/api/Social/posts/getPostsList?forFriends=${forFriend}&userId=${userId}`
    );
  }

  createPost(post: IPost): Observable<IPost[]> {
    return this.http.post<IPost[]>(
      `${this.apiUrl}/api/Social/posts/createPost`,
      post
    );
  }

  deletePost(postId: number): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Social/posts/deletePost?postId=${postId}`, null
    );
  }

  createPostComment(comment: IComment): Observable<IComment[]> {
    return this.http.post<IComment[]>(
      `${this.apiUrl}/api/Social/posts/createPostComment`,
      comment
    );
  }

  deletePostComment(postCommentId: number): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Social/posts/deletePostComment?postCommentId=${postCommentId}`, null
    );
  }

  getCommentsList(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(
      `${this.apiUrl}/api/Social/posts/getCommentsList?postId=${postId}`
    );
  }

  createPostLike(
    userId: number,
    postId: number,
    liked: boolean
  ): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/api/Social/posts/createPostLike?userId=${userId}&postId=${postId}&liked=${liked}`,
      null
    );
  }

  getNumberUnreadMessages(userId: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/api/Social/messages/getNumberUnreadMessages?userId=${userId}`
    );
  }

  getNumberUnreadMessagesInterval(userId: number) {
    this.subscriptions.add(
      interval(60000) // 60 seconds interval to check for new messages.
        .subscribe(() => {
          this.http
            .get(
              `${this.apiUrl}/api/Social/messages/getNumberUnreadMessages?userId=${userId}`
            )
            .subscribe((response) => {
              this.dataService.setData(response);
              return response;
            });
        })
    );
  }

  unsubscribeSocialPetitions(){
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }
}
