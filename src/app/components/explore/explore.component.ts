import { Component } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  numbers = Array(20).fill(4); // [4,4,4,4,4]
  movie_serie = "";
}
