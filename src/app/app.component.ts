import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SocialServiceService } from './services/social-service.service';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tube_Tracker';
  user!: any;
  unreadMessages: number = 0;
  subscriptions: Subscription = new Subscription();

  constructor(public translate: TranslateService, public router: Router, private socialService: SocialServiceService,
    private dataService: DataServiceService) {
    // Definimos lenguajes traducción y por defecto.
    this.translate.addLangs(['es-ES', 'en-EN']);
    this.translate.setDefaultLang('en-EN');
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
      this.translate.use(this.user.language);
    }

    this.subscriptions.add(
      this.socialService
        .getNumberUnreadMessages(this.user.userId)
        .subscribe((data) => {
          this.dataService.setData(data);
        })
    );
    this.socialService.getNumberUnreadMessagesInterval(this.user.userId);

    this.subscriptions.add(this.dataService.getData().subscribe((data) => this.unreadMessages = data));

  }

  ngOnDestroy(): void {
    this.socialService.unsubscribeSocialPetitions();
    this.subscriptions.unsubscribe();
  }
}
