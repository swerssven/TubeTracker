import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  constructor(private translate: TranslateService) {}

  // Method to convert UTCdate in locale.
  convertDateLocale = (date: Date) => {
    if (date.toString().includes('Z')) {
      return date;
    } else {
      return date + 'Z';
    }
  };

  // Method converts a date in elapsed time.
  getElapsedTime(from: Date): string {
    const now = new Date();
    const difference = now.getTime() - from.getTime();
    const minutes = Math.floor(difference / 60000); // 60000 ms = 1 minute
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} d`;
    } else if (hours > 0) {
      return `${hours} h`;
    } else if (minutes <= 1) {
      return this.translate.instant('DATETIME.NOW');
    } else {
      return `${minutes} min`;
    }
  }

  // method that converts minutes and returns an array with 2 strings: 'Months', 'Days', 'Hours'
  formatTimeStatistics(hours: number): string[] {
    const hoursPerDay = 24;
    const daysPerMonth = 30;

    const totalHours = Math.abs(hours);

    const months = Math.floor(totalHours / (hoursPerDay * daysPerMonth));
    const days = Math.floor(
      (totalHours % (hoursPerDay * daysPerMonth)) / hoursPerDay
    );
    const remainingHours = Math.floor(totalHours % hoursPerDay);

    const arrayResponse = new Array();
    arrayResponse.push(`${this.padNumber(months, 2)}`);
    arrayResponse.push(`${this.padNumber(days, 2)}`);
    arrayResponse.push(`${this.padNumber(remainingHours, 2)}`);

    return arrayResponse;
  }

  padNumber(value: number, length: number): string {
    return value.toString().padStart(length, '0');
  }
}
