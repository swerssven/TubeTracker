import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFriend } from 'src/app/interfaces/i-friend';
import { IUser } from 'src/app/interfaces/i-user';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.scss'],
})
export class FindFriendsComponent {
  searchFriendForm: FormGroup = this.formBuilder.group({
    search: ['', Validators.required],
  });
  user!: any;
  friends!: IFriend[];
  friendsSearchList!: IFriend[];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private socialService: SocialServiceService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    this.subscriptions.add(this.socialService.getFriends(this.user.userId).subscribe((data) => {
      this.friends = data;
    }));
  }

  searchForFriends() {
    this.subscriptions.add(this.socialService
      .GetSearchFriendsList(
        this.user.userId,
        this.searchFriendForm.value.search
      )
      .subscribe((data) => {this.friendsSearchList = data
      this.searchFriendForm.reset()}));
  }

  emptyFriendSearchList() {
    let SearchList!: IFriend[];
    this.friendsSearchList = SearchList;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
