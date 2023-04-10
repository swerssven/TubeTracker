import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetail } from 'src/app/interfaces/i-movie-detail';
import { IReview } from 'src/app/interfaces/i-review';
import { IUser } from 'src/app/interfaces/i-user';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { MovieServiceService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  productId!: number;
  movie!: IMovieDetail;
  trailerURL!: SafeResourceUrl;
  genres!: string[];
  reviews!: IReview[];
  review!: string;
  user!: any;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService
      .getMovieDetails(this.productId, 'es-ES')
      .subscribe((data) => {
        this.movie = data;
        this.genres = data.genresEs!.split(', ');
      });

    this.movieService
      .getMovieReviews(this.productId)
      .subscribe((data) => (this.reviews = data));
  }

  sanitizeURL() {
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.movie.trailer
    );
    return this.trailerURL;
  }

  createMovieReview() {
    const newReview: IReview = {
      userId: this.user.userId,
      userNickname: '',
      userImage: '',
      movieApiId: this.productId,
      content: this.review,
      creationDate: new Date(),
    };

    this.movieService.createMovieReview(newReview).subscribe((data) => {
      this.reviews = data;
    });

    this.review = "";
  }
}
