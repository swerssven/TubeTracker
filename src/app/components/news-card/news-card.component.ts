import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { INews } from 'src/app/interfaces/i-news';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent {
  @Input() newsArticle!: INews;
  content!: string;
  user!: any;
  language: string = 'en-EN';

  constructor(
    public sanitizer: DomSanitizer,
    public utils: UtilsServiceService
  ) {}
  ngOnInit(): void {
    this.newsArticle.contentEs = this.newsArticle.contentEs.replaceAll(
      '<img ',
      '<img class="img-fluid"'
    );
    this.newsArticle.contentEn = this.newsArticle.contentEn.replaceAll(
      '<img ',
      '<img class="img-fluid"'
    );

    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }

    if (!this.user) {
      this.content = this.newsArticle.contentEn;
    } else if (this.user && this.user.language == 'en-EN') {
      this.content = this.newsArticle.contentEn;
    } else if (this.user && this.user.language == 'es-ES') {
      this.content = this.newsArticle.contentEs;
    }
  }
}
