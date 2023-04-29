import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import IResolver from "../interfaces/i-resolver";
import { MovieServiceService } from "../services/movie-service.service";
import { IMovieDetail } from "../interfaces/i-movie-detail";

@Injectable({ providedIn: 'root' })
export class MovieResolver implements IResolver<any> {
  user!: any;
  constructor(private movieService: MovieServiceService) {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMovieDetail>{
    return this.movieService.getMovieDetails(Number(route.paramMap.get('id')), this.user.language, this.user.userId);
  };
}

export default MovieResolver;
