import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Librerías traducción.
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { PopularComponent } from './components/popular/popular.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
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
    UserProfileComponent,
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
    SerieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
