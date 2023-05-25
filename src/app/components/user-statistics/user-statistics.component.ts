import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IMovieSerieCard } from 'src/app/interfaces/i-movie-serie-card';
import { IStatistics } from 'src/app/interfaces/i-statistics';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { SerieServiceService } from 'src/app/services/serie-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { EditUserComponent } from '../loginComponents/edit-user/edit-user.component';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss'],
})
export class UserStatisticsComponent {
  user!: any;
  userId!: number;
  localUser!: any;
  statistics!: IStatistics;
  hoursMovies!: string[];
  hoursSeries!: string[];
  movies!: IMovieSerieCard[];
  series!: IMovieSerieCard[];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private utils: UtilsServiceService,
    private movieService: MovieServiceService,
    private serieService: SerieServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.params.subscribe((params) => {
      // Accede al nuevo valor del ID
      this.userId = +params['id'];

      if (this.userId) {
        this.subscriptions.add(
          this.userService.getUser(this.userId).subscribe((data) => {
            this.user = data;

            this.subscriptions.add(
              this.userService
                .GetUserStatistics(this.user.userId)
                .subscribe((data) => {
                  this.statistics = data;
                  this.hoursMovies = this.utils.formatTimeStatistics(
                    data.totalHoursMovies
                  );
                  this.hoursSeries = this.utils.formatTimeStatistics(
                    data.totalHoursSeries
                  );
                })
            );

            this.subscriptions.add(this.movieService.getLastWatchedMoviesList(this.user.userId, this.user.language).subscribe(
              (data) => {this.movies = data.reverse();}
            ));

            this.subscriptions.add(this.serieService.getLastWatchedSeriesList(this.user.userId, this.user.language).subscribe(
              (data) => {this.series = data.reverse();}
            ));
          })
        );
      }
    });

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.localUser = userString ? JSON.parse(userString) : null;
    }
  }

  profileConfiguration(){
    this.modalService.open(EditUserComponent, {centered: true});
  }

  logout(): void {
    localStorage.clear();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
