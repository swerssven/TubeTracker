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

  getElapsedTime(from: Date): string {
    const now = new Date();
    const difference = now.getTime() - from.getTime();
    const minutes = Math.floor(difference / 60000); // 60000 ms = 1 minute
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}min`;
    }
  }
}
