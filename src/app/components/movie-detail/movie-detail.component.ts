import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IMovieDetail } from 'src/app/interfaces/i-movie-detail';
import { IReview, IReviewDto } from 'src/app/interfaces/i-review';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { ShareComponent } from '../socialComponents/share/share.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent {
  isLoading: boolean = false;
  movieApiId!: number;
  movie!: IMovieDetail;
  trailerURL!: SafeResourceUrl;
  trailer!: string;
  title!: string;
  genres!: string[];
  description!: string;
  reviews!: IReviewDto;
  user!: any;
  auxRating!: number;
  rating!: number;
  ttRating!: number;
  reviewForm: FormGroup = this.formBuilder.group({
    review: ['', [Validators.minLength(20), Validators.required]],
  });
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private movieService: MovieServiceService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    public utils: UtilsServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.movieApiId = +this.route.snapshot.paramMap.get('id')!;

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.subscriptions.add(this.movieService
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
        this.isLoading = false;
      }));

    this.subscriptions.add(this.movieService.getMovieReviews(this.movieApiId).subscribe((data) => {
      this.reviews = data;
    }));

    this.subscriptions.add(this.movieService
      .getMovieRatings(this.movieApiId, this.user.userId)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      }));
  }

  restoreMovieRating() {
    this.subscriptions.add(this.movieService
      .getMovieRatings(this.movieApiId, this.user.userId)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      }));
  }

  setMovieRating() {
    this.subscriptions.add(this.movieService
      .setMovieRating(this.movieApiId, this.user.userId, this.auxRating)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      }));
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

    this.subscriptions.add(this.movieService.createMovieReview(newReview).subscribe((data) => {
      this.reviews = data;
      this.reviewForm.reset();
    }));
  }

  markWatched() {
    let watched = this.movie.watched ? false : true;
    this.subscriptions.add(this.movieService
      .setMovieWatched(
        this.movie.movieApiId,
        this.user.userId,
        this.user.language,
        watched
      )
      .subscribe((data) => {
        this.movie.watched = data;
      }));
  }

  markFavorite() {
    let favorite = this.movie.favorite ? false : true;
    this.subscriptions.add(this.movieService
      .setMovieFavorite(
        this.movie.movieApiId,
        this.user.userId,
        this.user.language,
        favorite
      )
      .subscribe((data) => {
        this.movie.favorite = data;
      }));
  }

  share(){
    let content = '<p style="margin-bottom: 25px;"></p><div contenteditable="false" class="card px-sm-3 px-md-3 py-1 p-3 my-0 mx-2 mx-md-5 mx-lg-5 shadow">\n <a\n style="text-decoration: none !important; color: inherit;"\n href="/movie/76600"\n style="cursor: pointer;"\n class="row d-flex justify-content-center align-items-center"\n >\n <div class="col-sm-12 col-md-6 col-lg-3">\n <img\n class="img-fluid ps-lg-4 p-lg-2"\n src="{{poster}}"\n alt=""\n />\n </div>\n <div class="col-sm-12 col-md-12 col-lg-9 pt-2 pb-0 mb-0">\n <p class="me-lg-4 pb-0 mb-0 ms-md-2 ms-lg-2">{{description}}\n </p>\n </div>\n </a>\n </div>';
    content = content.replaceAll('{{poster}}', ('https://image.tmdb.org/t/p/w400' + this.movie.poster));
    content = content.replaceAll('{{description}}', this.description);

    const modalRef = this.modalService.open(ShareComponent, {centered: true, size: 'xl'});
    modalRef.componentInstance.value = content;
  }

  reloadReviews(review: IReview){
    this.reviews.reviews = this.reviews.reviews.filter(p => p !== review);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
