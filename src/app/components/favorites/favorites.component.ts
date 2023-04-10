import { Component } from '@angular/core';
import { IUserResponse } from 'src/app/interfaces/i-user-response';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
user!: IUserResponse;

constructor(private dataService: DataServiceService){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
}
}
