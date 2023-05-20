import { Component, Input } from '@angular/core';
import { IFriend } from 'src/app/interfaces/i-friend';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-friend-list-message-card',
  templateUrl: './friend-list-message-card.component.html',
  styleUrls: ['./friend-list-message-card.component.scss']
})
export class FriendListMessageCardComponent {

  @Input() friend!: IFriend;
  user!: any;

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }
}
