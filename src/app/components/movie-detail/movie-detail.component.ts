import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetail } from 'src/app/interfaces/i-movie-detail';
import { IReview } from 'src/app/interfaces/i-review';
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
  genres!: string[];
  reviews!: IReview[];
  review!: string;
  user!: any;
  auxRating: number = 7;
  rating!: number;
  reviewForm: FormGroup = this.formBuilder.group({
    review: ['', [Validators.minLength(20), Validators.required]]
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private movieService: MovieServiceService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.movieApiId = +this.route.snapshot.paramMap.get('id')!;

    //this.restoreMovieRating();

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.movieService
      .getMovieDetails(this.movieApiId, 'es-ES', this.user.userId)
      .subscribe((data) => {
        this.movie = data;
        this.genres = data.genresEs!.split(', ');
        console.log(data)
      });

    this.movieService
      .getMovieReviews(this.movieApiId)
      .subscribe((data) => (this.reviews = data));

    // getmovierating service
  }

  restoreMovieRating() {
    this.auxRating = this.rating;
  }

  setMovieRating() {
      this.movieService.setMovieRating(this.movieApiId, this.user.userId, this.auxRating).subscribe(
        (data) => {this.rating = data
        console.log(data)}
      );
  }

  sanitizeURL() {
    this.trailerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.movie.trailerEs
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

    this.review = "";
  }
}
