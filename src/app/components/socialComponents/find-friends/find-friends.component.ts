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
  isLoading: boolean = false;
  searchFriendForm: FormGroup = this.formBuilder.group({
    search: ['', Validators.required],
  });
  user!: any;
  friends!: IFriend[];
  friendsSearchList!: IFriend[];
  friendsSuggestions!: IFriend[];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private socialService: SocialServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.loadFriends();
  }

  searchForFriends() {
    this.isLoading = true;
    this.subscriptions.add(
      this.socialService
        .GetSearchFriendsList(
          this.user.userId,
          this.searchFriendForm.value.search
        )
        .subscribe((data) => {
          this.friendsSearchList = data;
          this.isLoading = false;
          this.searchFriendForm.reset();
        })
    );
  }

  emptyFriendSearchList() {
    let SearchList!: IFriend[];
    this.friendsSearchList = SearchList;
  }

  reloadFriends(friend: IFriend) {
      this.loadFriends();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadFriends(){
    this.subscriptions.add(
      this.socialService
        .getFriends(this.user.userId, false)
        .subscribe((data) => {
          this.friends = data;
          this.isLoading = false;
        })
    );

    this.subscriptions.add(
      this.socialService
        .getFriends(this.user.userId, true)
        .subscribe((dataa) => {
          this.friendsSuggestions = dataa;
          this.isLoading = false;
        })
    );
  }
}
