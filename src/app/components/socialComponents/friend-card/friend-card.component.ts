import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  @Output() reloadFriends = new EventEmitter<IFriend>();
  private subscriptions: Subscription = new Subscription();

  constructor(
    private socialService: SocialServiceService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  inviteFriend() {
    this.subscriptions.add(
      this.socialService
        .createFriendInvitation(this.user.userId, this.friend.userId)
        .subscribe((data) => (this.friend = data))
    );
  }

  acceptInvitation(accept: boolean) {
    if (!accept) {
      if (confirm(this.translate.instant('ADMIN.SURE_ACTION'))) {
        this.subscriptions.add(
          this.socialService
            .acceptInvitation(this.user.userId, this.friend.userId, accept)
            .subscribe((data) => {
              this.friend = data;
              this.reloadFriends.emit(this.friend);
            })
        );
      }
    } else {
      this.subscriptions.add(
        this.socialService
          .acceptInvitation(this.user.userId, this.friend.userId, accept)
          .subscribe((data) => {
            this.friend = data;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
