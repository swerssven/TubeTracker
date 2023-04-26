import { Component } from '@angular/core';
import { INews } from 'src/app/interfaces/i-news';
import { NewsServiceService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  newsArticles!: INews[];

constructor(private newsService: NewsServiceService){}

  ngOnInit(): void {
    this.newsService.getNewsArticles().subscribe(
      (data) => this.newsArticles = data
    )
  }
}
