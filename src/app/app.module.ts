import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PopularComponent } from './components/popular/popular.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UserLoginComponent } from './components/loginComponents/user-login/user-login.component';
import { MovieSerieCardComponent } from './components/movie-serie-card/movie-serie-card.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsBoardComponent } from './components/socialComponents/news-board/news-board.component';
import { ProfileComponent } from './components/socialComponents/profile/profile.component';
import { FindFriendsComponent } from './components/socialComponents/find-friends/find-friends.component';
import { MessagesComponent } from './components/socialComponents/messages/messages.component';
import { LoginModalComponent } from './components/loginComponents/login-modal/login-modal.component';
import { SignUpModalComponent } from './components/loginComponents/sign-up-modal/sign-up-modal.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';
import { DurationPipe } from './pipes/DurationPipe';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { MovieReviewComponent } from './components/movie-review/movie-review.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { PostComponent } from './components/socialComponents/post/post.component';
import { FriendCardComponent } from './components/socialComponents/friend-card/friend-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsCreatorComponent } from './components/news-creator/news-creator.component';
import { SocialHomeComponent } from './components/socialComponents/social-home/social-home.component';
import { FriendsWithMessaggesListComponent } from './components/socialComponents/friends-with-messagges-list/friends-with-messagges-list.component';
import { MessageCardComponent } from './components/socialComponents/message-card/message-card.component';
import { FriendListMessageCardComponent } from './components/socialComponents/friend-list-message-card/friend-list-message-card.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { DatePipe } from '@angular/common';
import { CommentCardComponent } from './components/socialComponents/comment-card/comment-card.component';
import { MovieSerieFilterPipePipe } from './pipes/movie-serie-filter-pipe.pipe';
import { EditUserComponent } from './components/loginComponents/edit-user/edit-user.component';
import { ShareComponent } from './components/socialComponents/share/share.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

// Función para cargar archivo de traducción del proyecto.
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExploreComponent,
    PopularComponent,
    FavoritesComponent,
    UserLoginComponent,
    MovieSerieCardComponent,
    NewsCardComponent,
    NewsBoardComponent,
    ProfileComponent,
    FindFriendsComponent,
    MessagesComponent,
    LoginModalComponent,
    SignUpModalComponent,
    MovieDetailComponent,
    SerieDetailComponent,
    DurationPipe,
    UserStatisticsComponent,
    MovieReviewComponent,
    PostComponent,
    FriendCardComponent,
    NewsCreatorComponent,
    SocialHomeComponent,
    FriendsWithMessaggesListComponent,
    MessageCardComponent,
    FriendListMessageCardComponent,
    EpisodeCardComponent,
    CommentCardComponent,
    MovieSerieFilterPipePipe,
    EditUserComponent,
    ShareComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CarouselModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },{
    provide: TINYMCE_SCRIPT_SRC,
    useValue: 'tinymce/tinymce.min.js'
  },
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
