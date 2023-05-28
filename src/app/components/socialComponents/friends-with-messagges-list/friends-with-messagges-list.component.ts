import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFriend } from 'src/app/interfaces/i-friend';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-friends-with-messagges-list',
  templateUrl: './friends-with-messagges-list.component.html',
  styleUrls: ['./friends-with-messagges-list.component.scss'],
})
export class FriendsWithMessaggesListComponent {
  isLoading: boolean = false;
  friendsMessageList!: IFriend[];
  user!: any;
  private subscriptions: Subscription = new Subscription();

  constructor(private socialService: SocialServiceService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    this.subscriptions.add(this.socialService.getFriendsWithMessagesList(this.user.userId).subscribe((data) => {
      this.friendsMessageList = data;
      this.isLoading = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
