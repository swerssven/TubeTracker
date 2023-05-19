import { Component, Input } from '@angular/core';
import { IComment } from 'src/app/interfaces/i-comment';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment!: IComment;

  constructor(public utils: UtilsServiceService){}

  ngOnInit(): void {
    const date = new Date(this.utils.convertDateLocale(this.comment.creationDate!))
    this.comment.dateString = this.utils.getElapsedTime(date);
  }
}
