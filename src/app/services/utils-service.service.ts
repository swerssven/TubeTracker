import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  convertDateLocale = (date: Date) => {
    if (date.toString().includes('Z')) {
      return date;
    } else {
      return date + 'Z';
    }
  };
}
