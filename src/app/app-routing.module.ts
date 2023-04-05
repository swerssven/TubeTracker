import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { PopularComponent } from './components/popular/popular.component';
import { FindFriendsComponent } from './components/socialComponents/find-friends/find-friends.component';
import { MessagesComponent } from './components/socialComponents/messages/messages.component';
import { ProfileComponent } from './components/socialComponents/profile/profile.component';
import { NewsBoardComponent } from './components/socialComponents/news-board/news-board.component';
import { UserLoginComponent } from './components/loginComponents/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';
import { MovieResolver } from './resolvers/movie-resolver'
import { AuthGardGuard } from './guards/auth-gard.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'explore', canActivate: [AuthGardGuard], component: ExploreComponent},
  {path: 'popular', canActivate: [AuthGardGuard], component: PopularComponent},
  {path: 'favorites', canActivate: [AuthGardGuard], component: FavoritesComponent},
  {path: 'movie/:id', canActivate: [AuthGardGuard], component: MovieDetailComponent, resolve:{movie: MovieResolver}},
  {path: 'serie/:id', canActivate: [AuthGardGuard], component: SerieDetailComponent},
  {path: 'social/news-board', canActivate: [AuthGardGuard], component: NewsBoardComponent},
  {path: 'social/profile', canActivate: [AuthGardGuard], component: ProfileComponent},
  {path: 'social/find-friends', canActivate: [AuthGardGuard], component: FindFriendsComponent},
  {path: 'social/messages', canActivate: [AuthGardGuard], component: MessagesComponent},
  {path: 'user', canActivate: [AuthGardGuard], component: UserProfileComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
