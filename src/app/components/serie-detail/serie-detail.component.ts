import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IReview, IReviewDto } from 'src/app/interfaces/i-review';
import {
  IEpisode,
  ISeasonsEpisodesListDto,
} from 'src/app/interfaces/i-season-episode';
import { ISerieDetail } from 'src/app/interfaces/i-serie-detail';
import { SerieServiceService } from 'src/app/services/serie-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { ShareComponent } from '../socialComponents/share/share.component';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.scss'],
})
export class SerieDetailComponent {
  isLoadingDetails: boolean = false;
  isLoadingEpisodes: boolean = false;
  serieApiId!: number;
  serie!: ISerieDetail;
  title!: string;
  genres!: string[];
  description!: string;
  seasonEpisodes!: ISeasonsEpisodesListDto;
  episodeTitle!: string;
  temporadaSeleccionada: any = {};
  reviews!: IReviewDto;
  review!: string;
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
    private serieService: SerieServiceService,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    public utils: UtilsServiceService
  ) {}

  ngOnInit(): void {
    this.isLoadingDetails = true;
    this.isLoadingEpisodes = true;
    this.serieApiId = +this.route.snapshot.paramMap.get('id')!;

    //this.restoreMovieRating();

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.subscriptions.add(this.serieService
      .getSerieDetails(this.serieApiId, this.user.language, this.user.userId)
      .subscribe((data) => {
        this.serie = data;
        if (this.user.language == 'es-ES') {
          this.title = data.titleEs!;
          this.genres = data.genresEs!.split(', ');
          this.description = data.descriptionEs!;
        } else if (this.user.language == 'en-EN') {
          this.title = data.titleEn!;
          this.genres = data.genresEn!.split(', ');
          this.description = data.descriptionEn!;
        }
        this.isLoadingDetails = false;
      }));

      this.subscriptions.add(this.serieService
      .getSeasonsEpisodesList(this.serieApiId, this.user.userId)
      .subscribe((data) => {
        this.seasonEpisodes = data;
        this.temporadaSeleccionada = data.seasonsList[0];
        this.isLoadingEpisodes = false;
      }));

      this.subscriptions.add(this.serieService
      .getSerieReviews(this.serieApiId)
      .subscribe((data) => (this.reviews = data)));

      this.subscriptions.add(this.serieService
      .getSerieRatings(this.serieApiId, this.user.userId)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      }));
  }

  restoreSerieRating() {
    this.auxRating = this.rating;
  }

  setSerieRating() {
    this.subscriptions.add(this.serieService
      .setSerieRating(this.serieApiId, this.user.userId, this.auxRating)
      .subscribe((data) => {
        this.auxRating = data.userRating;
        this.ttRating = data.averageRating;
      }));
  }

  seleccionarTemporada(event: Event) {
    const target = event.target as HTMLSelectElement;
    const numSeason = +target.value;
    this.temporadaSeleccionada = this.seasonEpisodes.seasonsList.find(
      (season) => season.numSeason === numSeason
    );
    this.temporadaSeleccionada = this.temporadaSeleccionada || null;
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

    this.subscriptions.add(this.serieService.createSerieReview(newReview).subscribe((data) => {
      this.reviews = data;
    }));

    this.review = '';
  }

  markWatched() {
    let watched = this.serie.watched ? false : true;
    this.subscriptions.add(this.serieService
      .setSerieWatched(
        this.serie.serieApiId,
        this.user.userId,
        this.user.language,
        watched
      )
      .subscribe((data) => {
        this.serie.watched = data;
        this.seasonEpisodes.seasonsList.forEach((season) => {
          season.episodesList.forEach((episode) => {
            episode.watched = data;
          });
        });
      }));
  }

  checkWatchedEpisodeParent(episode: IEpisode) {
    this.subscriptions.add(this.serieService
      .getSerieDetails(this.serieApiId, this.user.language, this.user.userId)
      .subscribe((data) => {
        this.serie.watched = data.watched;
      }));
  }

  markFavorite() {
    let favorite = this.serie.favorite ? false : true;
    this.subscriptions.add(this.serieService
      .setSerieFavorite(
        this.serie.serieApiId,
        this.user.userId,
        this.user.language,
        favorite
      )
      .subscribe((data) => {
        this.serie.favorite = data;
      }));
  }

  share(){
    let content = '<p style="margin-bottom: 25px;"></p><div contenteditable="false" class="card px-sm-3 px-md-3 py-1 p-3 my-0 mx-2 mx-md-5 mx-lg-5 shadow">\n <a\n style="text-decoration: none !important; color: inherit;"\n href="/movie/76600"\n style="cursor: pointer;"\n class="row d-flex justify-content-center align-items-center"\n >\n <div class="col-sm-12 col-md-6 col-lg-3">\n <img\n class="img-fluid ps-lg-4 p-lg-2"\n src="{{poster}}"\n alt=""\n />\n </div>\n <div class="col-sm-12 col-md-12 col-lg-9 pt-2 pb-0 mb-0">\n <p class="me-lg-4 pb-0 mb-0 ms-md-2 ms-lg-2">{{description}}\n </p>\n </div>\n </a>\n </div>';
    content = content.replaceAll('{{poster}}', ('https://image.tmdb.org/t/p/w400' + this.serie.poster));
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
