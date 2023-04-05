import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetail } from 'src/app/interfaces/i-movie-detail';
import { MovieServiceService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  productId!: number;
  movie!: IMovieDetail;
  trailerURL!: SafeResourceUrl;
  genres!: string[];
  constructor(private route: ActivatedRoute, private movieService: MovieServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieDetails(this.productId, "es-ES").subscribe(
      (data) => {
        this.movie = data;
        this.genres = data.genresEs!.split(", ");
      }
    )
  }

  sanitizeURL(){
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.movie.trailer);
    return this.trailerURL;
  }
}
