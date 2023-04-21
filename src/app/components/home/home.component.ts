import { Component } from '@angular/core';
import { INews } from 'src/app/interfaces/i-news';
import { NewsServiceService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  numbers = Array(20).fill(4); // [4,4,4,4,4]

  newsArticles!: INews[];

constructor(private newsService: NewsServiceService){}

  ngOnInit(): void {
    this.newsService.getNewsArticles().subscribe(
      (data) => this.newsArticles = data
    )

  }

}
