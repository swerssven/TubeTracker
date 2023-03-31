import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { PopularComponent } from './components/popular/popular.component';
import { FindFriendsComponent } from './components/socialComponents/find-friends/find-friends.component';
import { MessagesComponent } from './components/socialComponents/messages/messages.component';
import { MyProfileComponent } from './components/socialComponents/my-profile/my-profile.component';
import { NewsBoardComponent } from './components/socialComponents/news-board/news-board.component';
import { UserLoginComponent } from './components/loginComponents/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'social/news-board', component: NewsBoardComponent},
  {path: 'social/my-profile', component: MyProfileComponent},
  {path: 'social/find-friends', component: FindFriendsComponent},
  {path: 'social/messages', component: MessagesComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
