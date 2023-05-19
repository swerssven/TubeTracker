import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IComment } from 'src/app/interfaces/i-comment';
import { IPost } from 'src/app/interfaces/i-post';
import { SocialServiceService } from 'src/app/services/social-service.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: IPost;
  Id: number = 0;
  user!: any;
  comments!: IComment[];
  commentForm: FormGroup = this.formBuilder.group({
    comment: ['', Validators.required],
  });

  constructor(
    public sanitizer: DomSanitizer,
    public utils: UtilsServiceService,
    private socialService: SocialServiceService,
    private formBuilder: FormBuilder
  ) {
    this.Id = Math.random();
    if (localStorage.getItem('user')) {
      let userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

  ngOnInit(): void {
    this.socialService
      .getCommentsList(this.post.postId!)
      .subscribe((data) => (this.comments = data));

    const date = new Date(
      this.utils.convertDateLocale(this.post.creationDate!)
    );
    this.post.dateString = this.utils.getElapsedTime(date);
  }

  // Method to send new comment.
  sendComment() {
    const newComment: IComment = {
      postId: this.post.postId!,
      userId: this.user.userId,
      content: this.commentForm.value.comment,
      creationDate: new Date(),
    };

    this.comments.unshift(newComment);

    this.socialService.createPostComment(newComment).subscribe((data) => {
      this.comments = data;
    });

    this.commentForm.reset();
  }
}
