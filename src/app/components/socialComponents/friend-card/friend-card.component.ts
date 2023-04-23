import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFriend } from 'src/app/interfaces/i-friend';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent {
  @Input() friend!: IFriend;
  user!: any;

  constructor(private socialService: SocialServiceService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  inviteFriend() {
    this.socialService
      .createFriendInvitation(this.user.userId, this.friend.userId)
      .subscribe((data) => (this.friend = data));
  }

  acceptInvitation() {
    this.socialService
      .acceptInvitation(this.user.userId, this.friend.userId)
      .subscribe((data) => {this.friend = data
      console.log(data)});
  }
}
