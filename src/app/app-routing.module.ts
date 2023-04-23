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
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';
import { MovieResolver } from './resolvers/movie-resolver'
import { AuthGardGuard } from './guards/auth-gard.guard';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { NewsCreatorComponent } from './components/news-creator/news-creator.component';
import { SocialHomeComponent } from './components/socialComponents/social-home/social-home.component';
import { FriendsWithMessaggesListComponent } from './components/socialComponents/friends-with-messagges-list/friends-with-messagges-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'explore', canActivate: [AuthGardGuard], component: ExploreComponent},
  {path: 'popular', canActivate: [AuthGardGuard], component: PopularComponent},
  {path: 'favorites', canActivate: [AuthGardGuard], component: FavoritesComponent},
  {path: 'movie/:id', canActivate: [AuthGardGuard], component: MovieDetailComponent, resolve:{movie: MovieResolver}},
  {path: 'news/newArticle', canActivate: [AuthGardGuard], component: NewsCreatorComponent},
  {path: 'serie/:id', canActivate: [AuthGardGuard], component: SerieDetailComponent},
  {path: 'social', canActivate: [AuthGardGuard], component: SocialHomeComponent,
    children: [
      {path: '', canActivate: [AuthGardGuard], component: NewsBoardComponent},
      {path: 'news-board', canActivate: [AuthGardGuard], component: NewsBoardComponent},
      {path: 'profile', canActivate: [AuthGardGuard], component: ProfileComponent},
      {path: 'find-friends', canActivate: [AuthGardGuard], component: FindFriendsComponent},
      {path: 'friends-messages-list', canActivate: [AuthGardGuard], component: FriendsWithMessaggesListComponent},
      {path: 'messages/:id', canActivate: [AuthGardGuard], component: MessagesComponent},
    ]},
  {path: 'statistics/:id', canActivate: [AuthGardGuard], component: UserStatisticsComponent},
  {path: 'login', component: UserLoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
