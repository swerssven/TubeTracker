import { Component } from '@angular/core';
import { IUserResponse } from 'src/app/interfaces/i-user-response';

@Component({
  selector: 'app-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent {
  user!: IUserResponse;

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  logout(): void {
    localStorage.clear();
  }
}
