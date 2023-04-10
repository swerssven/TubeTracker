import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private subject = new BehaviorSubject<any>(null);
  data$ = this.subject.asObservable();

  setData(data: any) {
    this.subject.next(data);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
