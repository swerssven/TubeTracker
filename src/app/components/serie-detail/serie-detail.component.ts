import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IReview, IReviewDto } from 'src/app/interfaces/i-review';
import { ISerieDetail } from 'src/app/interfaces/i-serie-detail';
import { SerieServiceService } from 'src/app/services/serie-service.service';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.scss'],
})
export class SerieDetailComponent {
  serieApiId!: number;
  serie!: ISerieDetail;
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
    private serieService: SerieServiceService
  ) {}

  ngOnInit(): void {
    this.serieApiId = +this.route.snapshot.paramMap.get('id')!;

    //this.restoreMovieRating();

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.serieService
      .getSerieDetails(this.serieApiId, this.user.language, this.user.userId)
      .subscribe((data) => {
        this.serie = data;
        console.log(data)
        if(this.user.language == "es-ES"){
          this.title = data.titleEs!;
          this.genres = data.genresEs!.split(', ');
          this.description = data.descriptionEs!;
        } else if(this.user.language == "en-EN"){
          this.title = data.titleEn!;
          this.genres = data.genresEn!.split(', ');
          this.description = data.descriptionEn!;
        }
      });

    this.serieService
      .getSerieReviews(this.serieApiId)
      .subscribe((data) => (this.reviews = data));

    this.serieService
      .getSerieRatings(this.serieApiId, this.user.userId)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      });
  }

  restoreSerieRating() {
    this.auxRating = this.rating;
  }

  setSerieRating() {
    this.serieService
      .setSerieRating(this.serieApiId, this.user.userId, this.auxRating)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      });
  }

  createSerieReview() {
    const newReview: IReview = {
      userId: this.user.userId,
      userNickname: '',
      userImage: '',
      serieApiId: this.serieApiId,
      content: this.reviewForm.value.review,
      creationDate: new Date(),
    };

    this.serieService.createSerieReview(newReview).subscribe((data) => {
      this.reviews = data;
    });

    this.review = '';
  }

  markWatched(){
      let watched = this.serie.watched ? false : true;
      this.serieService.setSerieWatched(this.serie.serieApiId, this.user.userId, this.user.language, watched).subscribe(
        (data) => {this.serie.watched = data;}
      )

  }

  markFavorite(){
      let favorite = this.serie.favorite ? false : true;
      this.serieService.setSerieFavorite(this.serie.serieApiId, this.user.userId, this.user.language, favorite).subscribe(
        (data) => {this.serie.favorite = data;}
      )

  }
}
