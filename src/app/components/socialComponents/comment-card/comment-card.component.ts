import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IComment } from 'src/app/interfaces/i-comment';
import { SocialServiceService } from 'src/app/services/social-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {
  @Input() comment!: IComment;
  @Output() reloadComments = new EventEmitter<IComment>();
  user!: any;
  subscriptions: Subscription = new Subscription();

  constructor(public utils: UtilsServiceService, private socialService: SocialServiceService){}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
    const date = new Date(this.utils.convertDateLocale(this.comment.creationDate!))
    this.comment.dateString = this.utils.getElapsedTime(date);
  }

  deleteComment(){
    this.subscriptions.add(
      this.socialService.deletePostComment(this.comment.postCommnentsId!).subscribe()
    );
    this.reloadComments.emit(this.comment);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
