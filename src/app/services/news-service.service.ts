import { Injectable } from '@angular/core';
import { INews } from '../interfaces/i-news';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  constructor(private http: HttpClient) { }

  createNewsArticle(newsArticle: INews): Observable<INews[]>{
    return this.http.post<INews[]>(`https://localhost:7203/api/News/news/createNewsArticle`, newsArticle);
  }

  getNewsArticles(): Observable<INews[]>{
    return this.http.get<INews[]>('https://localhost:7203/api/News/news/getNewsArticles');
  }
}
