import { Injectable } from '@angular/core';
import { INews } from '../interfaces/i-news';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {
  apiUrl!: string;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.apiUrl = environment.apiUrl;
    } else {
      this.apiUrl = environment.apiUrl;
    }
  }

  createNewsArticle(newsArticle: INews): Observable<INews[]>{
    return this.http.post<INews[]>(`${this.apiUrl}/api/News/news/createNewsArticle`, newsArticle);
  }

  getNewsArticles(): Observable<INews[]>{
    return this.http.get<INews[]>(`${this.apiUrl}/api/News/news/getNewsArticles`);
  }
}
