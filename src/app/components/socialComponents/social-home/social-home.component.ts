import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SocialServiceService } from 'src/app/services/social-service.service';

@Component({
  selector: 'app-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.scss'],
})
export class SocialHomeComponent {
  subscriptions: Subscription = new Subscription();
  unreadMessages: number = 0;
  user!: any;
  constructor(public router: Router, private socialService: SocialServiceService, private dataService: DataServiceService) {}

  private ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.dataService.getData().subscribe((data) => this.unreadMessages = data);
  }
}
