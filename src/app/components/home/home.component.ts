import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { INews } from 'src/app/interfaces/i-news';
import { NewsServiceService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading = false;
  user!: any;
  newsArticles: INews[] = [];
  private subscriptions: Subscription = new Subscription();

constructor(private newsService: NewsServiceService){}

  ngOnInit(): void {
    this.isLoading = true

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    this.subscriptions.add(this.newsService.getNewsArticles().subscribe(
      (data) => {
        this.newsArticles = data
        this.isLoading = false
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
