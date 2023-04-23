import { Component } from '@angular/core';
import { IFriend } from 'src/app/interfaces/i-friend';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-friends-with-messagges-list',
  templateUrl: './friends-with-messagges-list.component.html',
  styleUrls: ['./friends-with-messagges-list.component.scss'],
})
export class FriendsWithMessaggesListComponent {
  friendsMessageList!: IFriend[];
  user!: any;

  constructor(private socialService: SocialServiceService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    this.socialService.getFriendsWithMessagesList(this.user.userId).subscribe((data) => {
      console.log(this.friendsMessageList)
      this.friendsMessageList = data;

      console.log(this.friendsMessageList);
    });
  }
}
