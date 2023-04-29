import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetail } from 'src/app/interfaces/i-movie-detail';
import { IReview, IReviewDto } from 'src/app/interfaces/i-review';
import { MovieServiceService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  movieApiId!: number;
  movie!: IMovieDetail;
  trailerURL!: SafeResourceUrl;
  trailer!: string;
  title!: string;
  genres!: string[];
  description!: string;
  reviews!: IReviewDto;
  review!: string;
  user!: any;
  auxRating!: number;
  rating!: number;
  ttRating!: number;
  reviewForm: FormGroup = this.formBuilder.group({
    review: ['', [Validators.minLength(20), Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private movieService: MovieServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movieApiId = +this.route.snapshot.paramMap.get('id')!;

    //this.restoreMovieRating();

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService
      .getMovieDetails(this.movieApiId, this.user.language, this.user.userId)
      .subscribe((data) => {
        this.movie = data;
        if (this.user.language == 'es-ES') {
          this.title = data.titleEs!;
          this.genres = data.genresEs!.split(', ');
          this.description = data.descriptionEs!;
          this.trailer = data.trailerEs!;
        } else if (this.user.language == 'en-EN') {
          this.title = data.titleEn!;
          this.genres = data.genresEn!.split(', ');
          this.description = data.descriptionEn!;
          this.trailer = data.trailerEn!;
        }
      });

    this.movieService.getMovieReviews(this.movieApiId).subscribe((data) => {
      this.reviews = data;
    });

    this.movieService
      .getMovieRatings(this.movieApiId, this.user.userId)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      });
  }

  restoreMovieRating() {
    this.auxRating = this.rating;
  }

  setMovieRating() {
    this.movieService
      .setMovieRating(this.movieApiId, this.user.userId, this.auxRating)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      });
  }

  sanitizeURL() {
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.trailer
    );
    return this.trailerURL;
  }

  createMovieReview() {
    const newReview: IReview = {
      userId: this.user.userId,
      userNickname: '',
      userImage: '',
      movieApiId: this.movieApiId,
      content: this.reviewForm.value.review,
      creationDate: new Date(),
    };

    this.movieService.createMovieReview(newReview).subscribe((data) => {
      this.reviews = data;
    });

    this.review = '';
  }

  markWatched() {
    let watched = this.movie.watched ? false : true;
    this.movieService
      .setMovieWatched(
        this.movie.movieApiId,
        this.user.userId,
        this.user.language,
        watched
      )
      .subscribe((data) => {
        this.movie.watched = data;
      });
  }

  markFavorite() {
    let favorite = this.movie.favorite ? false : true;
    this.movieService
      .setMovieFavorite(
        this.movie.movieApiId,
        this.user.userId,
        this.user.language,
        favorite
      )
      .subscribe((data) => {
        this.movie.favorite = data;
      });
  }
}
