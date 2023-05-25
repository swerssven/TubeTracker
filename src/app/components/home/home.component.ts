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

  newsArticles: INews[] = [];
  private subscriptions: Subscription = new Subscription();

constructor(private newsService: NewsServiceService){}

  ngOnInit(): void {
    this.subscriptions.add(this.newsService.getNewsArticles().subscribe(
      (data) => this.newsArticles = data
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
