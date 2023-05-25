import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { INews } from 'src/app/interfaces/i-news';
import { NewsServiceService } from 'src/app/services/news-service.service';

@Component({
  selector: 'app-news-creator',
  templateUrl: './news-creator.component.html',
  styleUrls: ['./news-creator.component.scss'],
})
export class NewsCreatorComponent {
  value: string = '';
  user!: any;
  language: string = 'en-EN';
  article: INews = {
    userId: 0,
    contentEn: '',
    contentEs: '',
    titleEn: '',
    titleEs: ''
  };

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image emoticons table wordcount',
    skin: 'oxide-dark',
    content_css: 'dark',
  };

  private subscriptions: Subscription = new Subscription();

  constructor(
    public sanitizer: DomSanitizer,
    private newsService: NewsServiceService
  ) {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  createNewsArticle() {
    if (this.language == 'en-EN') {
      this.article.contentEn = this.value;
      this.language = 'es-ES';
      console.log(this.article);
      this.value = '';
    } else if (this.language == 'es-ES') {
      this.article.userId = this.user.userId;
      this.article.contentEs = this.value;
      console.log(this.article);
      this.subscriptions.add(this.newsService.createNewsArticle(this.article).subscribe(
        () => {
        alert('Article uploaded correctly');
        location.reload();
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
