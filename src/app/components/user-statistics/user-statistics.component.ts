import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStatistics } from 'src/app/interfaces/i-statistics';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

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
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private utils: UtilsServiceService
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
          })
        );
      }
    });

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.localUser = userString ? JSON.parse(userString) : null;
    }
  }

  logout(): void {
    localStorage.clear();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
