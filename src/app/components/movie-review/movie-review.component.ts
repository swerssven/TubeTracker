import { Component, Input } from '@angular/core';
import { IReview } from 'src/app/interfaces/i-review';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent {
  @Input() review!: IReview;
}
